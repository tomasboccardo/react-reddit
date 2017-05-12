import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {matchPath} from 'react-router';
import {push} from 'react-router-redux';
import {Link} from 'react-router-dom'
import {get} from 'lodash';
import {Navbar, FormGroup, FormControl, Button, Row, Col} from 'react-bootstrap';
import {fireSubredditEditorChange} from '../../actions';

import './Header.css'

class Header extends React.Component {
	onSubredditEditorChange() {
		this.props.fireSubredditEditorChange(ReactDom.findDOMNode(this.subredditEditorNode).value);
	}

	handleKeyPress(target) {
		if(target.charCode === 13){
			// Enter!!
			this.props.fireSubredditChange(this.props.subredditEditorValue)
		}
	}

	render() {
		return (
			<div className="App__header">
				<Navbar inverse fixedTop>
					<Row>
						<Col xs={3}>
							<Navbar.Header>
								<Navbar.Brand>
									<Link to="/">React Reddit</Link>
								</Navbar.Brand>
								<Navbar.Toggle />
							</Navbar.Header>
						</Col>
						<Col xs={6}>
							<Navbar.Collapse>
								<Navbar.Brand className="App__header__subreddit-title">
									<Link to={`/r/${this.props.subreddit}`}>{this.props.subreddit}</Link>
								</Navbar.Brand>
							</Navbar.Collapse>
						</Col>
						<Col xs={3}>
							<Navbar.Collapse>
								<Navbar.Form pullRight>
									<FormGroup className="App__header__subreddit-input">
										<FormControl type="text" placeholder="subreddit" ref={node => this.subredditEditorNode = node} onChange={() => this.onSubredditEditorChange()} onKeyPress={target => this.handleKeyPress(target)}/>
									</FormGroup>
									<Button type="submit" bsStyle="primary" onClick={() => this.props.fireSubredditChange(this.props.subredditEditorValue)}>Go!</Button>
								</Navbar.Form>
							</Navbar.Collapse>
						</Col>
					</Row>
				</Navbar>
			</div>
		);
	}
}

Header.propTypes = {
	subredditEditorValue: PropTypes.string.isRequired,
	subreddit: PropTypes.string,
	fireSubredditChange: PropTypes.func.isRequired,
	fireSubredditEditorChange: PropTypes.func.isRequired,
};


export {Header};

const mapStateToProps = (state) => {
	const match = matchPath(get(state, 'routing.location.pathname'), {path: '/r/:subreddit', exact: true});
	return {
		subredditEditorValue: get(state, `app.subreddit_editor_value`),
		subreddit: get(state, `subreddit.${get(match, 'params.subreddit')}.display_name`),
	}
};


const HeaderContainer = connect(mapStateToProps, {
	fireSubredditChange: (subreddit) => push(`/r/${subreddit}`),
	fireSubredditEditorChange,
})(Header);

export default HeaderContainer;