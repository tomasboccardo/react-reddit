import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { get } from 'lodash';

import { fireArticlesFetch, fireSubredditDetailsFetch } from './actions';
import ArticleList from './components/article-list/ArticleList';
import Sidebar from './components/sidebar/Sidebar';

import './Subreddit.css';

class Subreddit extends React.Component {
	fetchData(subreddit) {
		this.props.fireArticlesFetch(subreddit);
		this.props.fireSubredditDetailsFetch(subreddit);
	}

	componentWillMount() {
		this.fetchData(this.props.subreddit);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.subreddit !== nextProps.subreddit) {
			this.fetchData(nextProps.subreddit);
		}
	}

	render() {
		return (
			<Grid className="Subreddit">
				<Row className="article-list">
					<Col xs={9}><ArticleList articles={this.props.articles}/></Col>
					<Col xs={3}><Sidebar details={this.props.subredditDetails}/></Col>
				</Row>
			</Grid>
		);
	}
}

Subreddit.propTypes = {
	articles: PropTypes.array.isRequired,
	subredditDetails: PropTypes.object.isRequired,
	subreddit: PropTypes.string.isRequired,
	fireArticlesFetch: PropTypes.func.isRequired,
	fireSubredditDetailsFetch: PropTypes.func.isRequired,
};

export {Subreddit};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	subreddit: ownProps.match.params.subreddit,
});

const mapStateToProps = (state, ownProps) => {
	return {
		articles: get(state, `subreddit.${ownProps.match.params.subreddit}.top_articles`, []),
		subredditDetails: get(state, `subreddit.${ownProps.match.params.subreddit}`, {}),
	}
};

const SubredditContainer = connect(mapStateToProps, {
	fireArticlesFetch,
	fireSubredditDetailsFetch,
}, mergeProps)(Subreddit);

export default SubredditContainer;
