import {SUBREDDIT_EDITOR_CHANGE} from '../../actions/action-types';

const APP_INITIAL_STATE = {
	selected_subreddit: 'highqualitygifs',
	subreddit_editor_value: '',
};

export function appReducer(state = APP_INITIAL_STATE, action) {
	switch (action.type) {
		case SUBREDDIT_EDITOR_CHANGE:
			return { ...state, subreddit_editor_value: action.payload} ;
		default:
			return state
	}
}
