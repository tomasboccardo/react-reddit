import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './ArticleItemScore.css';

export default class ArticleItemScore extends React.Component {
	render() {
		return (
			<div className="ArticleItem__votes">
				<FontAwesome name='chevron-up'/>
				<div>{this.props.score}</div>
				<FontAwesome name='chevron-down'/>
			</div>
		)
	}
}

ArticleItemScore.propTypes = {
	score: PropTypes.number.isRequired,
};