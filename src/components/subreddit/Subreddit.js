import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ArticleList from './components/article-list/ArticleList';
import Sidebar from './components/sidebar/Sidebar';

import './Subreddit.css';

class Subreddit extends React.Component {
	render() {
		console.log(this);
		return (
			<Grid className="Subreddit">
				<Row className="article-list">
					<Col xs={9}><ArticleList subreddit={this.props.match.params.subreddit}/></Col>
					<Col xs={3}><Sidebar subreddit={this.props.match.params.subreddit}/></Col>
				</Row>
			</Grid>
		);
	}
}


export default Subreddit;


