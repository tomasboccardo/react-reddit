import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { get, flow } from 'lodash';

import { fireArticlesFetch } from './actions';
import withInitialData from '../common/withInitialData';
import ArticleList from '../subreddit/components/article-list/ArticleList';

import './Home.css';

const Home = ({ articles }) => (
	<Grid className="Home">
		<Row className="article-list">
			<Col xs={12}><ArticleList articles={articles} /></Col>
		</Row>
	</Grid>
);

Home.propTypes = {
	articles: PropTypes.array.isRequired,
	fireArticlesFetch: PropTypes.func.isRequired,
};

export { Home };

const mapStateToProps = (state) => {
	return {
		articles: get(state, 'home.frontpage.top_articles', []),
	}
};

const mapDispatchToProps = {
	fireArticlesFetch,
};

const HomeContainer = flow([
	withInitialData(mapDispatchToProps),
	connect(mapStateToProps, mapDispatchToProps),
])(Home);

export default HomeContainer;
