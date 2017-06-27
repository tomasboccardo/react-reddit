import React from 'react';
import {Switch, Route} from 'react-router';

import routes from '../../routes'
import Header from './components/header/Header';


import './App.css';

const App = () => (
		<div className="App">
			<Header/>
			<div className="App__body">
				<Switch>
					{routes.map(route => <Route exact={route.exact} key={route.path} path={route.path} component={route.component}/>)}
				</Switch>
			</div>
		</div>
	);

export default App
