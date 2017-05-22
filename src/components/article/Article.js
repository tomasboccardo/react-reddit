import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Img from 'react-image'
import {get} from 'lodash';
import ArticleHeader from './components/article-header/ArticleHeader';
import {fireArticleFetch} from './actions'

import './Article.css'

class Article extends React.Component {
	static fetchData(store, params) {
		return store.dispatch(fireArticleFetch(params.id));
	}

	componentWillMount() {
		if (!this.props.article) {
			this.props.fireArticleFetch(this.props.id);
		}
	}

	getContentPreview() {
		const embed = get(this.props.article, 'media_embed.content');
		if (embed) {
			return <div className="Article__embedded-content" dangerouslySetInnerHTML={{__html: embed}}></div>;
		} else if (this.props.article.selftext_html) {
			return <div className="Article__self-text" dangerouslySetInnerHTML={{__html: this.props.article.selftext_html}}></div>;
		} else {
			return <div className="Article__embedded-content">
				<Img src={[
					this.props.article.url,
					get(this.props.article, 'preview.images.0.source.url'),
					this.props.article.thumbnail,
				]}/>
			</div>;
		}
	}

	render() {
		return (
			<Row className="Article">
				{this.props.article ?
					<Col xs={12}>
						<ArticleHeader article={this.props.article}/>
						{this.getContentPreview()}
					</Col>
					:
					<div></div>
				}
			</Row>
		);
	}
}

Article.propTypes = {
	id: PropTypes.string.isRequired,
	article: PropTypes.object,
	fireArticleFetch: PropTypes.func.isRequired,
};

export {Article};

const mapStateToProps = (state, ownProps) => {
	return {
		id: ownProps.match.params.id,
		article: get(state, `articles.${ownProps.match.params.id}`),
	}
};

export default connect(mapStateToProps, {fireArticleFetch})(Article);
