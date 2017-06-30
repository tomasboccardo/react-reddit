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

function _objectToSanitizeJSON(obj) {
	return JSON.stringify(obj).replace(/</g, '\\u003c');
}

function _universalRenderer(req, res, index) {
	const history = createMemoryHistory();

	let store = configureStore({ history });

	const promises = [];
	routes.some(route => {
		const match = matchPath(req.url, route);
		if (match) {
			promises.push(route.component.fetchData(store, match.params));
		}
		return match
	});

	Promise.all(promises).then(() => {
		const context = {};
		const state = _objectToSanitizeJSON(store.getState());
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
			const renderedApp = index
				.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
				.replace('<script id="state"></script>',
					`<script id="state">window.__PRELOADED_STATE__=${state}</script>`);
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
