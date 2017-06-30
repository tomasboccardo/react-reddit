import redditService from '../../services/reddit';
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

function fireArticlesFetchResponse(articles) {
	return {
		type: FRONTPAGE_ARTICLES_FETCH_RESPONSE,
		payload: {
			articles,
		},
	}
}

function fireArticlesFetchError(error) {
	return {
		type: FRONTPAGE_ARTICLES_FETCH_ERROR,
		payload: {
			error,
		},
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

		return redditService.getTop()
			.then((articles) => populateArticlesAuthorName(articles))
			.then(articles => dispatch(fireArticlesFetchResponse(articles)),
				error => dispatch(fireArticlesFetchError(error)));
	}
}
