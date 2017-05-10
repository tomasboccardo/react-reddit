import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {fireSubredditDetailsFetch} from '../../actions';

import './Sidebar.css'

class Sidebar extends React.Component {
	componentWillMount() {
		this.props.fireSubredditDetailsFetch(this.props.subreddit);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.subreddit !== nextProps.subreddit) {
			this.props.fireSubredditDetailsFetch(nextProps.subreddit);
		}
	}

	render() {
		return (
			<div className="Home__sidebar">
				<div dangerouslySetInnerHTML={{__html: this.props.details.description_html}} />
			</div>
		);
	}
}

Sidebar.propTypes = {
	details: PropTypes.object.isRequired,
	fireSubredditDetailsFetch: PropTypes.func.isRequired,
};


export {Sidebar};

const mapStateToProps = (state, ownProps) => {
	return {
		details: get(state, `subreddit.${ownProps.subreddit}`, {}),
	}
};

const SidebarContainer = connect(mapStateToProps, {fireSubredditDetailsFetch})(Sidebar);

SidebarContainer.propTypes = {
	subreddit: PropTypes.string.isRequired,
};


export default SidebarContainer;