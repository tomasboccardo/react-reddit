import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import {fireSubredditChange, fireSubredditEditorChange} from '../actions';

class Header extends React.Component {
	onSubredditEditorChange() {
		this.props.fireSubredditEditorChange(ReactDom.findDOMNode(this.subredditEditorNode).value);
	}

	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						React Reddit
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Navbar.Form pullLeft>
						<FormGroup>
							<FormControl type="text" placeholder="subreddit" ref={node => this.subredditEditorNode = node} defaultValue={this.props.subredditEditorValue} onChange={() => this.onSubredditEditorChange()}/>
						</FormGroup>
						<Button type="submit" onClick={() => this.props.fireSubredditChange(this.props.subredditEditorValue)}>Go!</Button>
					</Navbar.Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

Header.propTypes = {
	subredditEditorValue: PropTypes.string.isRequired,
	fireSubredditChange: PropTypes.func.isRequired,
	fireSubredditEditorChange: PropTypes.func.isRequired,
};


export {Header};

const mapStateToProps = (state) => {
	const subredit = get(state, `app.selected_subreddit`);
	return {
		subredditEditorValue: get(state, `app.subreddit_editor_value`) || subredit,
	}
};

const HeaderContainer = connect(mapStateToProps, {
	fireSubredditChange,
	fireSubredditEditorChange,
})(Header);


export default HeaderContainer;