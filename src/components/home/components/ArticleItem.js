import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Media,Row,Col} from 'react-bootstrap';
import {get} from 'lodash';
import isUrl from 'is-url';
import FontAwesome from 'react-fontawesome';

class ArticleItem extends React.Component {
	render() {
		return (
			<li className="list-group-item">
				<Row>
					<Col xs={10}>
						<Media>
							{isUrl(this.props.article.thumbnail) &&
								<Media.Left>
									<img width={64} height={64} src={this.props.article.thumbnail} alt={this.props.article.id}/>
								</Media.Left>
							}
							<Media.Body>
								<Media.Heading>{this.props.article.title}</Media.Heading>
							</Media.Body>
						</Media>
					</Col>
					<Col xs={2} className="article-votes">
						<Row>
							<Col xs={12}>
								{this.props.article.ups}
								<FontAwesome name='chevron-up'/>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								{this.props.article.downs}
								<FontAwesome name='chevron-down'/>
							</Col>
						</Row>
					</Col>
				</Row>
			</li>
		);
	}
}

ArticleItem.propTypes = {
	article: PropTypes.object.isRequired,
};


export {ArticleItem};

const mapStateToProps = (state, ownProps) => {
	return {
		article: get(state, `articles.${ownProps.id}`),
	}
};

const ArticleItemContainer = connect(mapStateToProps)(ArticleItem);

ArticleItemContainer.propTypes = {
	id: PropTypes.string.isRequired,
};

export default ArticleItemContainer;