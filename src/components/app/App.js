import React from 'react';
import {Route} from 'react-router';

import Header from './components/Header';
import Home from '../home/Home';
import Article from '../article/Article';

import './App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<Header/>
				</div>
				<div className="App-body">
					<Route exact path="/" component={Home}/>
					<Route exact path="/article/:id" component={Article}/>
				</div>
			</div>
		);
	}
}

export default App;
