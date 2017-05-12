import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {push} from 'react-router-redux';
import {Media,Row,Col} from 'react-bootstrap';
import {get} from 'lodash';
import isUrl from 'is-url';
import TimeAgo from 'react-timeago'
import LinesEllipsis from 'react-lines-ellipsis'

import ArticleItemScore from './components/score/ArticleItemScore'

import './ArticleItem.css';

class ArticleItem extends React.Component {
	render() {
		return (
			<li className="list-group-item ArticleItem" onClick={() => this.props.goToArticle(this.props.article.id)}>
				<Row>
					<Col xs={1}>
						<ArticleItemScore score={this.props.article.score}/>
					</Col>
					<Col xs={11}>
						<Media>
							{isUrl(this.props.article.thumbnail) &&
								<Media.Left>
									<img width={64} height={64} src={this.props.article.thumbnail} alt={this.props.article.id}/>
								</Media.Left>
							}
							<Media.Body>
									<Media.Heading>
										<LinesEllipsis text={this.props.article.title} maxLine='1' ellipsis='...' trimRight basedOn='letters'/>
									</Media.Heading>
								<Row>
									<Col xs={6}>created <TimeAgo date={this.props.article.created * 1000}/> by {this.props.article.author.name}</Col>
								</Row>
								<Row>
									<Col xs={12}>
										<Link to={`/r/${this.props.article.subreddit.display_name.toLowerCase()}`} onClick={e => e.stopPropagation()}>{this.props.article.subreddit.display_name}</Link> - {this.props.article.num_comments} comments
									</Col>
								</Row>
							</Media.Body>
						</Media>
					</Col>
				</Row>
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
	goToArticle: (id) => push(`/article/${id}`)
})(ArticleItem);

ArticleItemContainer.propTypes = {
	id: PropTypes.string.isRequired,
};

export default ArticleItemContainer;