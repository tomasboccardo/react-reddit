import r from '../../services/reddit';
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

function fireArticleFetchResponse(payload) {
	return {
		type: ARTICLES_FETCH_RESPONSE,
		payload,
	}
}

function fireArticleFetchError(payload) {
	return {
		type: ARTICLES_FETCH_ERROR,
		payload,
	}
}

export function fireArticleFetch(id) {
	return (dispatch) => {
		dispatch(fireArticleFetchRequest());

		return r.getSubmission(id).fetch()
			.then(response => {
				dispatch(fireArticleFetchResponse(response))
			})
			.catch(error => {
				dispatch(fireArticleFetchError(error));
			})

	}
}
