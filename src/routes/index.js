import React from 'react';
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux'

import App from '../components/app/App';

export default history => (
	<ConnectedRouter history={history}>
		<Route path="/" component={App}/>
	</ConnectedRouter>
)

