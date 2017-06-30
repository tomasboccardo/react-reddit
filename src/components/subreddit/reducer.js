import mapActionToReducer from 'redux-action-reducer-mapper'
import {map} from 'lodash';
import {
	SUBREDDIT_ARTICLES_FETCH_RESPONSE,
	SUBREDDIT_DETAILS_FETCH_RESPONSE,
} from '../../actions/action-types';

const INITIAL_STATE = {};

export const subredditReducer = mapActionToReducer({
	'default': INITIAL_STATE,
	[SUBREDDIT_DETAILS_FETCH_RESPONSE]: (state, action) => ({
		...state,
		[action.payload.subreddit]: {
			...state[action.payload.subreddit],
			...action.payload.details,
		},
	}),
	[SUBREDDIT_ARTICLES_FETCH_RESPONSE]: (state, action) => ({
		...state,
		[action.payload.subreddit]: {
			...state[action.payload.subreddit],
			top_articles: map(action.payload.articles, 'id'),
		},
	})
});