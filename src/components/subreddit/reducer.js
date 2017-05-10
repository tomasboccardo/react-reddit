import {keyBy, map} from 'lodash';
import {
	SUBREDDIT_ARTICLES_FETCH_RESPONSE,
	SUBREDDIT_DETAILS_FETCH_RESPONSE,
	FRONTPAGE_ARTICLES_FETCH_RESPONSE,
} from '../../actions/action-types';

const ARTICLES_REDUCER = {};

export function articlesReducer(state = ARTICLES_REDUCER, action) {
	switch (action.type) {
		case SUBREDDIT_ARTICLES_FETCH_RESPONSE:
			return { ...state, ...keyBy(action.payload.articles, element => element.id) } ;
		case FRONTPAGE_ARTICLES_FETCH_RESPONSE:
			return { ...state, ...keyBy(action.payload, element => element.id) } ;
		default:
			return state
	}
}

const SUBREDDIT_REDUCER = {};

export function subredditReducer(state = SUBREDDIT_REDUCER, action) {
	switch (action.type) {
		case SUBREDDIT_DETAILS_FETCH_RESPONSE:
			return {
				...state,
				[action.payload.subreddit]: {
					...state[action.payload.subreddit],
					...action.payload.details
				}
			};
		case SUBREDDIT_ARTICLES_FETCH_RESPONSE:
			return {
				...state,
				[action.payload.subreddit]: {
					...state[action.payload.subreddit],
					top_articles: map(action.payload.articles, 'id'),
				}} ;
		default:
			return state
	}
}