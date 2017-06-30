import mapActionToReducer from 'redux-action-reducer-mapper'
import { map } from 'lodash';
import {
	FRONTPAGE_ARTICLES_FETCH_RESPONSE,
} from '../../actions/action-types';

const INITIAL_STATE = {
	frontpage: {
		top_articles: [],
	}
};

export const homeReducer = mapActionToReducer({
	'default': INITIAL_STATE,
	[FRONTPAGE_ARTICLES_FETCH_RESPONSE]: (state, action) => ({
		...state,
		frontpage: {
			...state.frontpage,
			top_articles: map(action.payload.articles, 'id')
		}
	})
});
