import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {get} from 'lodash';
import ArticleHeader from '../../../article/components/article-header/ArticleHeader';

import './ArticleItem.css';

class ArticleItem extends React.Component {
	render() {
		return (
			<li className="list-group-item ArticleItem" onClick={() => this.props.goToArticle(this.props.article.permalink)}>
				<ArticleHeader article={this.props.article}/>
			</li>
		);
	}
}

ArticleItem.propTypes = {
	article: PropTypes.object.isRequired,
	goToArticle: PropTypes.func.isRequired,
};


export {ArticleItem};

const mapStateToProps = (state, ownProps) => {
	return {
		article: get(state, `articles.${ownProps.id}`),
	}
};

const ArticleItemContainer = connect(mapStateToProps, {
	goToArticle: (permalink) => push(permalink)
})(ArticleItem);

ArticleItemContainer.propTypes = {
	id: PropTypes.string.isRequired,
};

export default ArticleItemContainer;