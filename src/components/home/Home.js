import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';
import {get} from 'lodash';
import ArticleList from './components/ArticleList';

import './Home.css';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: {}
		}
	}

	render() {
		return (
			<Grid className="Home">
				<Row className="article-list">
					<Col xs={9}><ArticleList subreddit={this.props.subreddit}/></Col>
					<Col xs={3}>THE SIDEBAR LIVES HERE</Col>
				</Row>
			</Grid>
		);
	}
}

Home.propTypes = {
	subreddit: PropTypes.string.isRequired,
};

export {Home};

const mapStateToProps = (state) => {
	return {
		subreddit: get(state, `app.selected_subreddit`),
	}
};

const HomeContainer = connect(mapStateToProps)(Home);


export default HomeContainer;


