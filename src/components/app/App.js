import React from 'react';
import {Route} from 'react-router';

import Header from './components/header/Header';
import Home from '../home/Home';
import Subreddit from '../subreddit/Subreddit';
import Article from '../article/Article';

import './App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Header/>
				<div className="App__body">
					<Route exact path="/" component={Home}/>
					<Route exact path="/r/:subreddit" component={Subreddit}/>
					<Route exact path="/r/:subreddit/comments/:id/:title/" component={Article}/>
				</div>
			</div>
		);
	}
}

export default App;
