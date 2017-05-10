import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Home extends React.Component {
	render() {
		return (
			<div>This is home</div>
		);
	}
}

Home.propTypes = {
	subreddit: PropTypes.string.isRequired,
};

export {Home};

const HomeContainer = connect()(Home);


export default HomeContainer;


