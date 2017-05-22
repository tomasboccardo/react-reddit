import r from '../../services/reddit';
import {
	FRONTPAGE_ARTICLES_FETCH_REQUEST,
	FRONTPAGE_ARTICLES_FETCH_RESPONSE,
	FRONTPAGE_ARTICLES_FETCH_ERROR,
} from '../../actions/action-types';

function fireArticlesFetchRequest() {
	return {
		type: FRONTPAGE_ARTICLES_FETCH_REQUEST,
	};
}

function fireArticlesFetchResponse(payload) {
	return {
		type: FRONTPAGE_ARTICLES_FETCH_RESPONSE,
		payload,
	}
}

function fireArticlesFetchError(payload) {
	return {
		type: FRONTPAGE_ARTICLES_FETCH_ERROR,
		payload,
	}
}

export function fireArticlesFetch() {
	return (dispatch) => {
		dispatch(fireArticlesFetchRequest());

		return r.getTop()
			.then(response => {
				dispatch(fireArticlesFetchResponse(response))
			})
			.catch(error => {
				dispatch(fireArticlesFetchError(error));
			})

	}
}
