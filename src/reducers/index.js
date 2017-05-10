import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {
	homeReducer as home,
	articlesReducer as articles,
	subredditReducer as subreddit,
} from '../components/subreddit/reducer';
import {appReducer as app} from '../components/app/reducer';

const rootReducer = combineReducers({
	routing,
	home,
	articles,
	app,
	subreddit,
});

export default rootReducer;