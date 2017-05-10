import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {
	articlesReducer as articles,
	subredditReducer as subreddit,
} from '../components/subreddit/reducer';
import { homeReducer as home } from '../components/home/reducer';
import {appReducer as app} from '../components/app/reducer';

const rootReducer = combineReducers({
	app,
	articles,
	home,
	routing,
	subreddit,
});

export default rootReducer;