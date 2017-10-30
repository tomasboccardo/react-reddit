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
import index from '../build/index.html';

function _objectToSanitizeJSON(obj) {
	return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export function universalRenderer(req, res) {
	// We need to create a new store for each request.
	const history = createMemoryHistory();
	const store = configureStore({ history });

	const promises = [];
	routes.some(route => {
		const match = matchPath(req.url, route);
		if (match) {
			// For each route that matches, we will fetch the initial data to populate the newly created store.
			promises.push(route.component.withInitialDataFetch(store, match.params));
		}
		return match
	});

	Promise.all(promises).then(() => {
		// Once all the initial data is fetched, we need to render the React App to a string to generate the page HTML
		const context = {};
		const state = _objectToSanitizeJSON(store.getState());
		const reactApp = ReactDomServer.renderToString(
			<Provider store={store}>
				<StaticRouter context={context} location={req.url}>
					<App />
				</StaticRouter>
			</Provider>
		);

		if (context.url) {
			res.redirect(302, context.url);
		} else {
			const renderedApp = index
				// We need to embed the React App HTML that we geneated
				.replace(
					'<div id="root"></div>',
					`<div id="root">${reactApp}</div>`
				)
				// Also, we need to send the current state of the App to avoid flickering
				.replace(
					'<script id="state"></script>',
					`<script id="state">window.__PRELOADED_STATE__=${state}</script>`
				);
			res.send(renderedApp)
		}
	})
}
