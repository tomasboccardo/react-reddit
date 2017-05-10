import {SUBREDDIT_EDITOR_CHANGE} from '../../actions/action-types';

export function fireSubredditEditorChange(newValue) {
	return {
		type: SUBREDDIT_EDITOR_CHANGE,
		payload: newValue,
	}
}