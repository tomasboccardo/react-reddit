import React from 'react';
import {Route} from 'react-router'

import Home from '../home/Home'
import Article from '../article/Article'

import logo from '../../logo.svg';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Welcome to React</h2>
				</div>
				<div>
					<Route exact path="/" component={Home}/>
					<Route exact path="/article/:id" component={Article}/>
				</div>
			</div>
		);
	}
}

export default App;
