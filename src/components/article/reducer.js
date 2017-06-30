import mapActionToReducer from 'redux-action-reducer-mapper'
import { keyBy } from 'lodash';
import {
	ARTICLES_FETCH_RESPONSE,
	SUBREDDIT_ARTICLES_FETCH_RESPONSE,
	FRONTPAGE_ARTICLES_FETCH_RESPONSE,
} from '../../actions/action-types';

const INITIAL_STATE = {};


export const articlesReducer = mapActionToReducer({
	'default': INITIAL_STATE,
	[ARTICLES_FETCH_RESPONSE]: (state, action) => ({
		...state,
		[action.payload.article.id]: action.payload.article
	}),
	[SUBREDDIT_ARTICLES_FETCH_RESPONSE]: (state, action) => ({
		...state,
		...keyBy(action.payload.articles, element => element.id)
	}),
	[FRONTPAGE_ARTICLES_FETCH_RESPONSE]: (state, action) => ({
		...state,
		...keyBy(action.payload.articles, element => element.id)
	}),
});
