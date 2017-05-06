import {keyBy, map} from 'lodash';
import {SUBREDDIT_ARTICLES_FETCH_RESPONSE} from '../../actions/action-types';

const HOME_INITIAL_STATE = {
	subreddit_top_articles: [],
};

export function homeReducer(state = HOME_INITIAL_STATE, action) {
	switch (action.type) {
		case SUBREDDIT_ARTICLES_FETCH_RESPONSE:
			return { ...state, subreddit_top_articles: map(action.payload, 'id')} ;
		default:
			return state
	}
}

const ARTICLES_REDUCER = {};

export function articlesReducer(state = ARTICLES_REDUCER, action) {
	switch (action.type) {
		case SUBREDDIT_ARTICLES_FETCH_RESPONSE:
			return { ...state, ...keyBy(action.payload, element => element.id) } ;
		default:
			return state
	}
}