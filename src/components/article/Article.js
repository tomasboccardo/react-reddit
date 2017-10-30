import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Img from 'react-image'
import { get, flow } from 'lodash';

import { fireArticleFetch } from './actions'
import withInitialData from '../common/withInitialData';
import ArticleHeader from './components/article-header/ArticleHeader';

import './Article.css'

function getContentPreview(article) {
	const embed = get(article, 'media_embed.content');
	if (embed) {
		return <div className="Article__embedded-content" dangerouslySetInnerHTML={{ __html: embed }}></div>;
	} else if (article.selftext_html) {
		return <div className="Article__self-text" dangerouslySetInnerHTML={{ __html: article.selftext_html }}></div>;
	} else {
		return <div className="Article__embedded-content">
			<Img src={[
				article.url,
				get(article, 'preview.images.0.source.url'),
				article.thumbnail,
			]} />
		</div>;
	}
}

const Article = ({ id, article }) => (
	<Row className="Article">
		{article ?
			<Col xs={12}>
				<ArticleHeader article={article} />
				{getContentPreview(article)}
			</Col>
			:
			<div></div>
		}
	</Row>
);

Article.propTypes = {
	id: PropTypes.string.isRequired,
	article: PropTypes.object,
};

export { Article };

const mapStateToProps = (state, ownProps) => {
	return {
		id: ownProps.match.params.id,
		article: get(state, `articles.${ownProps.match.params.id}`),
	}
};

const mapDispatchToProps = {
	fireArticleFetch,
}

const ArticleContainer = flow([
	withInitialData(mapDispatchToProps, [ 'id' ]),
	connect(mapStateToProps, mapDispatchToProps),
])(Article);

export default ArticleContainer;
