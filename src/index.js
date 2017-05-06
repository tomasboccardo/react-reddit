import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory'

import configureStore from './store';
import createRoutes from './routes';


import './index.css';

const history = createBrowserHistory();
const store = configureStore({history});

ReactDOM.render(
	<Provider store={store}>
		{createRoutes(history)}
	</Provider>,
	document.getElementById('root')
);
