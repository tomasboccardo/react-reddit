import redditService from '../../services/reddit';
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

function fireArticlesFetchResponse(articles, subreddit) {
	return {
		type: SUBREDDIT_ARTICLES_FETCH_RESPONSE,
		payload: {
			articles,
			subreddit,
		},
	}
}

function fireArticlesFetchError(error) {
	return {
		type: SUBREDDIT_ARTICLES_FETCH_ERROR,
		payload: {
			error,
		},
	}
}

export function fireArticlesFetch(subreddit) {
	return (dispatch) => {
		dispatch(fireArticlesFetchRequest());

		return redditService.getSubreddit(subreddit).getTop()
			.then((articles) => populateArticlesAuthorName(articles))
			.then(articles => dispatch(fireArticlesFetchResponse(articles, subreddit)),
				error => dispatch(fireArticlesFetchError(error)));
	}
}

function fireSubredditDetailsFetchRequest() {
	return {
		type: SUBREDDIT_DETAILS_FETCH_REQUEST,
	};
}

function fireSubredditDetailsFetchResponse(details, subreddit) {
	return {
		type: SUBREDDIT_DETAILS_FETCH_RESPONSE,
		payload: {
			details,
			subreddit,
		},
	}
}

function fireSubredditDetailsFetchError(error) {
	return {
		type: SUBREDDIT_DETAILS_FETCH_ERROR,
		payload: {
			error
		},
	}
}

export function fireSubredditDetailsFetch(subreddit) {
	return (dispatch) => {
		dispatch(fireSubredditDetailsFetchRequest());

		return redditService.getSubreddit(subreddit).fetch()
			.then(details => dispatch(fireSubredditDetailsFetchResponse(details, subreddit)),
				error => dispatch(fireSubredditDetailsFetchError(error)));
	}
}