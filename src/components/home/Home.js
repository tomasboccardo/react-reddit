import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { get } from 'lodash';

import { fireArticlesFetch } from './actions';
import ArticleList from '../subreddit/components/article-list/ArticleList';

import './Home.css';

class Home extends React.Component {
	static fetchData(store) {
		return store.dispatch(fireArticlesFetch());
	}

	componentWillMount() {
		return this.props.fireArticlesFetch();
	}

	render() {
		return (
			<Grid className="Home">
				<Row className="article-list">
					<Col xs={12}><ArticleList articles={this.props.articles}/></Col>
				</Row>
			</Grid>
		);
	}
}

Home.propTypes = {
	articles: PropTypes.array.isRequired,
	fireArticlesFetch: PropTypes.func.isRequired,
};

export {Home};

const mapStateToProps = (state) => {
	return {
		articles: get(state, 'home.frontpage.top_articles', []),
	}
};

const HomeContainer = connect(mapStateToProps, {
	fireArticlesFetch,
})(Home);

export default HomeContainer;
