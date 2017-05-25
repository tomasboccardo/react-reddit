import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Media,Row,Col} from 'react-bootstrap';
import isUrl from 'is-url';
import TimeAgo from 'react-timeago'
import LinesEllipsis from 'react-lines-ellipsis'

import ArticleItemScore from '../article-score/ArticleItemScore'

class ArticleHeader extends React.Component {
	render() {
		return (
			<Row className="ArticleHeader">
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
								<a href={this.props.article.url} onClick={e => e.stopPropagation()}><LinesEllipsis text={this.props.article.title} maxLine='1' ellipsis='...' trimRight basedOn='letters'/></a>
							</Media.Heading>
							<Row>
								<Col xs={6}>created <TimeAgo date={this.props.article.created * 1000}/> by {this.props.article.authorName}</Col>
							</Row>
							<Row>
								<Col xs={12}>
									<Link to={`/${this.props.article.subreddit_name_prefixed}`} onClick={e => e.stopPropagation()}>{this.props.article.subreddit_name_prefixed}</Link> - {this.props.article.num_comments} comments
									<span className="ArticleItem__domain">({this.props.article.domain})</span>
								</Col>
							</Row>
						</Media.Body>
					</Media>
				</Col>
			</Row>
		);
	}
}

ArticleHeader.propTypes = {
	article: PropTypes.object.isRequired,
};

export default ArticleHeader;