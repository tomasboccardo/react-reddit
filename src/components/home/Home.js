import React from 'react';
import ArticleList from './components/ArticleList';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: {}
		}
	}

	render() {
		return (
			<div className="Home">
				<ArticleList/>
			</div>
		);
	}
}

export default Home;
