import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { get, flow } from 'lodash';

import { fireArticlesFetch, fireSubredditDetailsFetch } from './actions';
import withInitialData from '../common/withInitialData';
import SubredditHeader from './components/subreddit-header/SubredditHeader';
import ArticleList from './components/article-list/ArticleList';
import Sidebar from './components/sidebar/Sidebar';

import './Subreddit.css';

const Subreddit = ({ articles, subredditDetails, subreddit }) => (
	<div className="Subreddit">
		<SubredditHeader subredditDetails={subredditDetails} />
		<Grid className="Subreddit__Articles">
			<Row className="article-list">
				<Col xs={9}><ArticleList articles={articles} /></Col>
				<Col xs={3}><Sidebar details={subredditDetails} /></Col>
			</Row>
		</Grid>
	</div>
);

Subreddit.propTypes = {
	articles: PropTypes.array.isRequired,
	subredditDetails: PropTypes.object.isRequired,
	subreddit: PropTypes.string.isRequired,
};

export { Subreddit };

const mapDispatchToProps = {
	fireArticlesFetch,
	fireSubredditDetailsFetch,
}

const mapStateToProps = (state, ownProps) => {
	return {
		articles: get(state, `subreddit.${ownProps.match.params.subreddit}.top_articles`, []),
		subredditDetails: get(state, `subreddit.${ownProps.match.params.subreddit}`, {}),
		subreddit: ownProps.match.params.subreddit,
	}
};

const SubredditContainer = flow([
	withInitialData(mapDispatchToProps, [ 'subreddit' ]),
	connect(mapStateToProps, mapDispatchToProps),
])(Subreddit);

export default SubredditContainer;
