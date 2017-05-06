import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {homeReducer as home, articlesReducer as articles} from '../components/home/reducer';

const rootReducer = combineReducers({
	routing,
	home,
	articles,
});

export default rootReducer;