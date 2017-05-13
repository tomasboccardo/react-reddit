import { keyBy } from 'lodash';
import {
	ARTICLES_FETCH_RESPONSE,
	SUBREDDIT_ARTICLES_FETCH_RESPONSE,
	FRONTPAGE_ARTICLES_FETCH_RESPONSE,
} from '../../actions/action-types';

const ARTICLES_REDUCER = {};

export function articlesReducer(state = ARTICLES_REDUCER, action) {
	switch (action.type) {
		case ARTICLES_FETCH_RESPONSE:
			return { ...state, [action.payload.id]: action.payload } ;
		case SUBREDDIT_ARTICLES_FETCH_RESPONSE:
			return { ...state, ...keyBy(action.payload.articles, element => element.id) } ;
		case FRONTPAGE_ARTICLES_FETCH_RESPONSE:
			return { ...state, ...keyBy(action.payload, element => element.id) } ;
		default:
			return state
	}
}
