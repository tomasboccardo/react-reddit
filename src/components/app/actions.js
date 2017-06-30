import {SUBREDDIT_EDITOR_CHANGE} from '../../actions/action-types';

export function fireSubredditEditorChange(subreddit) {
	return {
		type: SUBREDDIT_EDITOR_CHANGE,
		payload: {
			subreddit,
		},
	}
}