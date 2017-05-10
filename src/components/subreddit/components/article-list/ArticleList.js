import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup} from 'react-bootstrap';
import ArticleItem from '../article-item/ArticleItem';

class ArticleList extends React.Component {
	render() {
		return (
			<ListGroup>
				{this.props.articles.map(articleId => <ArticleItem key={articleId} id={articleId}/>)}
			</ListGroup>
		);
	}
}

ArticleList.propTypes = {
	articles: PropTypes.array.isRequired,
};

export default ArticleList;
