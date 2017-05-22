import 'ignore-styles';
import babelRegister from 'babel-register';

babelRegister({ ignore: /\/(build|node_modules)\//, presets: ['react-app'] });

import path from 'path';

import express from 'express';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router';
import { createMemoryHistory } from 'history';

import routes from '../src/routes';
import configureStore from '../src/store';

import App from '../src/components/app/App'
import htmlIndex from '../build/index.html';

function universalLoader(req, res) {
	const history = createMemoryHistory();

	let store = configureStore({ history });

	const promises = [];
	routes.some(route => {
		// use `matchPath` here
		const match = matchPath(req.url, route);
		if (match) {
			console.log(match);
			promises.push(route.loadData(store, match.params));
		}
		return match
	});

	Promise.all(promises).then(() => {
		const context = {};
		const reactApp = renderToString(
			createElement(Provider, {store},
				createElement(StaticRouter, { location: req.url, context },
					createElement(App)
				)
			)
		);

		if (context.url) {
			res.redirect(302, context.url);
		} else {
			const renderedApp = htmlIndex
				.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
				.replace('window.__PRELOADED_STATE__=void 0', `window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`);
			res.send(renderedApp)
		}
	})
}

const app = express();

app.use('^/$', universalLoader);
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/', universalLoader);

app.listen(3001, ()=>{
	console.log(`App listening on port 3001!`)
});