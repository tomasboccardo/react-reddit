import { map } from 'lodash';
import {
	FRONTPAGE_ARTICLES_FETCH_RESPONSE,
} from '../../actions/action-types';

const HOME_REDUCER = {
	frontpage: {
		top_articles: [],
	}
};

export function homeReducer(state = HOME_REDUCER, action) {
	switch (action.type) {
		case FRONTPAGE_ARTICLES_FETCH_RESPONSE:
			return { ...state, frontpage: { ...state.frontpage, top_articles: map(action.payload, 'id') } } ;
		default:
			return state
	}
}