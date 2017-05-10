import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css'

class Sidebar extends React.Component {
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
};

export default Sidebar;
