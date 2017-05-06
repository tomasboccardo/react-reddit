import rootReducer from '../reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk';

const composeEnhancers = typeof window === 'object' &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default ({initialState, history}) => {
	const router = routerMiddleware(history);

	return createStore(rootReducer, initialState, composeEnhancers(
		applyMiddleware(router),
		applyMiddleware(thunk)
	));
};
