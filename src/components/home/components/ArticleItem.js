import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {get} from 'lodash';

class ArticleItem extends React.Component {
	render() {
		return (
			<li className="list-group-item">
				{this.props.title}
			</li>
		);
	}
}

ArticleItem.propTypes = {
	title: PropTypes.string.isRequired,
};


export {ArticleItem};

const mapStateToProps = (state, ownProps) => {
	return {
		title: get(state, `articles.${ownProps.id}.title`),
	}
};

const ArticleItemContainer = connect(mapStateToProps)(ArticleItem);

ArticleItemContainer.propTypes = {
	id: PropTypes.string.isRequired,
};

export default ArticleItemContainer;