import mapActionToReducer from 'redux-action-reducer-mapper'
import {SUBREDDIT_EDITOR_CHANGE} from '../../actions/action-types';

const INITIAL_STATE = {
	subreddit_editor_value: '',
};

export const appReducer = mapActionToReducer({
	'default': INITIAL_STATE,
	[SUBREDDIT_EDITOR_CHANGE]: (state, action) => ({
		...state,
		subreddit_editor_value: action.payload.subreddit
	}),
});
