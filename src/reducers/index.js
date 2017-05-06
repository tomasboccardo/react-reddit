import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {homeReducer as home, articlesReducer as articles} from '../components/home/reducer';
import {appReducer as app} from '../components/app/reducer';

const rootReducer = combineReducers({
	routing,
	home,
	articles,
	app,
});

export default rootReducer;