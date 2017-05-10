import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {fireArticlesFetch} from '../../actions';
import {ListGroup} from 'react-bootstrap';
import ArticleItem from '../article-item/ArticleItem';

class ArticleList extends React.Component {
	componentWillMount() {
		this.props.fireArticlesFetch(this.props.subreddit);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.subreddit !== nextProps.subreddit) {
			this.props.fireArticlesFetch(nextProps.subreddit);
		}
	}

	render() {
		return (
			<ListGroup>
				{this.props.articles.map(articleId => <ArticleItem key={articleId} id={articleId}/>)}
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
		articles: get(state, `home.subreddit_top_articles`, []),
	}
};

const ArticleListContainer = connect(mapStateToProps, {fireArticlesFetch})(ArticleList);

ArticleListContainer.propTypes = {
	subreddit: PropTypes.string.isRequired,
};


export default ArticleListContainer;