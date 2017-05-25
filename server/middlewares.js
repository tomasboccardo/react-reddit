import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router';
import { createMemoryHistory } from 'history';

import routes from '../src/routes';
import configureStore from '../src/store';

import App from '../src/components/app/App'
import htmlIndex from '../build/index.html';

function _universalRenderer(req, res, index) {
	const history = createMemoryHistory();

	let store = configureStore({ history });

	const promises = [];
	routes.some(route => {
		const match = matchPath(req.url, route);
		if (match) {
			promises.push(route.loadData(store, match.params));
		}
		return match
	});

	Promise.all(promises).then(() => {
		const context = {};
		const reactApp = ReactDomServer.renderToString(
			<Provider store={store}>
				<StaticRouter context={context} location={req.url}>
					<App/>
				</StaticRouter>
			</Provider>
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

export function universalRenderer(req, res) {
	fs.readFile(path.resolve(__dirname, '..', 'build', 'index.html'), 'utf8', function (err, index) {
		if (err) {
			console.log(err);
			res.status(500).send(err)
		} else {
			_universalRenderer(req,res, index)
		}
	});

}
