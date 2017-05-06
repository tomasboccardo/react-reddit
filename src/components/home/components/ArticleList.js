import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {fireArticlesFetch} from '../actions';
import {ListGroup} from 'react-bootstrap';
import ArticleItem from './ArticleItem';

class ArticleList extends React.Component {
	componentWillMount() {
		this.props.fireArticlesFetch(this.props.subreddit);
	}

	render() {
		return (
			<ListGroup>
				{this.props.articles.map(article => <ArticleItem id={article}/>)}
			</ListGroup>
		);
	}
}

ArticleList.propTypes = {
	subreddit: PropTypes.string.isRequired,
	articles: PropTypes.array.isRequired,
	fireArticlesFetch: PropTypes.func.isRequired,
};


export {ArticleList};

const mapStateToProps = (state) => {
	return {
		subreddit: get(state, `home.selected_subreddit`),
		articles: get(state, `home.subreddit_top_articles`, []),
	}
};

const ArticleListContainer = connect(mapStateToProps, {fireArticlesFetch})(ArticleList);


export default ArticleListContainer;