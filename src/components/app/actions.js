import {SUBREDDIT_CHANGE, SUBREDDIT_EDITOR_CHANGE} from '../../actions/action-types';

export function fireSubredditChange(newSubreddit) {
	return {
		type: SUBREDDIT_CHANGE,
		payload: newSubreddit,
	};
}

export function fireSubredditEditorChange(newValue) {
	return {
		type: SUBREDDIT_EDITOR_CHANGE,
		payload: newValue,
	}
}