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

export function populateArticlesAuthorName(articles) {
	return Promise.all(articles.map(article => {
		return article.author.fetch().then(author => {
			article.authorName = author.name;
		})
	})).then(() => articles);
}

export function fireArticlesFetch() {
	return (dispatch) => {
		dispatch(fireArticlesFetchRequest());

		return r.getTop()
			.then((articles) => populateArticlesAuthorName(articles))
			.then(articles => dispatch(fireArticlesFetchResponse(articles)))
			.catch(error => {
				dispatch(fireArticlesFetchError(error));
			})

	}
}
