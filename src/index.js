import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'

import configureStore from './store';
import App from './components/app/App';

import './index.css';
import 'font-awesome/css/font-awesome.css';

let initialState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;


const history = createBrowserHistory();
const store = configureStore({initialState, history});

ReactDOM.hydrate(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
