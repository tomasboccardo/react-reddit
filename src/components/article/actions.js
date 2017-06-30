import redditService from '../../services/reddit';
import {
	ARTICLES_FETCH_REQUEST,
	ARTICLES_FETCH_RESPONSE,
	ARTICLES_FETCH_ERROR,
} from '../../actions/action-types';

function fireArticleFetchRequest() {
	return {
		type: ARTICLES_FETCH_REQUEST,
	};
}

function fireArticleFetchResponse(article) {
	return {
		type: ARTICLES_FETCH_RESPONSE,
		payload: {
			article,
		},
	}
}

function fireArticleFetchError(error) {
	return {
		type: ARTICLES_FETCH_ERROR,
		payload: {
			error,
		},
	}
}

export function fireArticleFetch(id) {
	return (dispatch) => {
		dispatch(fireArticleFetchRequest());

		return redditService.getSubmission(id).fetch()
			.then(article => dispatch(fireArticleFetchResponse(article)),
				error => dispatch(fireArticleFetchError(error)));
	}
}
