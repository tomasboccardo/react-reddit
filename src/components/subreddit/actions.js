import r from '../../services/reddit';
import {
	SUBREDDIT_ARTICLES_FETCH_REQUEST,
	SUBREDDIT_ARTICLES_FETCH_RESPONSE,
	SUBREDDIT_ARTICLES_FETCH_ERROR,
	SUBREDDIT_DETAILS_FETCH_REQUEST,
	SUBREDDIT_DETAILS_FETCH_RESPONSE,
	SUBREDDIT_DETAILS_FETCH_ERROR,
} from '../../actions/action-types';
import { populateArticlesAuthorName } from '../home/actions';

function fireArticlesFetchRequest() {
	return {
		type: SUBREDDIT_ARTICLES_FETCH_REQUEST,
	};
}

function fireArticlesFetchResponse(payload) {
	return {
		type: SUBREDDIT_ARTICLES_FETCH_RESPONSE,
		payload,
	}
}

function fireArticlesFetchError(payload) {
	return {
		type: SUBREDDIT_ARTICLES_FETCH_ERROR,
		payload,
	}
}

export function fireArticlesFetch(subreddit) {
	return (dispatch) => {
		dispatch(fireArticlesFetchRequest());

		return r.getSubreddit(subreddit).getTop()
			.then((articles) => populateArticlesAuthorName(articles))
			.then(articles => dispatch(fireArticlesFetchResponse({subreddit, articles})))
			.catch(error => {
				dispatch(fireArticlesFetchError(error));
			})

	}
}

function fireSubredditDetailsFetchRequest() {
	return {
		type: SUBREDDIT_DETAILS_FETCH_REQUEST,
	};
}

function fireSubredditDetailsFetchResponse(payload) {
	return {
		type: SUBREDDIT_DETAILS_FETCH_RESPONSE,
		payload,
	}
}

function fireSubredditDetailsFetchError(payload) {
	return {
		type: SUBREDDIT_DETAILS_FETCH_ERROR,
		payload,
	}
}

export function fireSubredditDetailsFetch(subreddit) {
	return (dispatch) => {
		dispatch(fireSubredditDetailsFetchRequest());

		return r.getSubreddit(subreddit).fetch()
			.then(response => {
				dispatch(fireSubredditDetailsFetchResponse({subreddit, details: response}))
			})
			.catch(error => {
				dispatch(fireSubredditDetailsFetchError(error));
			})

	}
}