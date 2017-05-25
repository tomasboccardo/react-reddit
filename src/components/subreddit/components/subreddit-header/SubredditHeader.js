import React from 'react';
import PropTypes from 'prop-types';
import {Row,Col, Navbar} from 'react-bootstrap';

import './SubredditHeader.css';

class SubredditHeader extends React.Component {
	render() {
		return (
			<Navbar inverse className="SubredditHeader">
				<Row>
					<Col xs={12}>
						<Navbar.Collapse>
							<Navbar.Brand className="SubredditHeader__title">
								{this.props.subredditDetails.title}
							</Navbar.Brand>
						</Navbar.Collapse>
					</Col>
				</Row>
			</Navbar>
		);
	}
}

SubredditHeader.propTypes = {
	subredditDetails: PropTypes.object.isRequired,
};

export default SubredditHeader;