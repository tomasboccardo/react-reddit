import React from 'react';
import hoistStatics from 'hoist-non-react-statics'

import { map, pick, isEqual } from 'lodash';

/**
 * withInitialData HOC decorates your component to enable Universal Rendering.
 * It adds React's lifecycle hooks to fetch data when the component is mounted.
 * Also, the withInitialDataFetch static method is added. This method will be called in the server when the component route is matched, to load the initial data
 * 
 * @param {Object<Function>} actions - The data fetching methods will execute all the actions passed in the `actions` object, both in the server and the client.
 * @param {Array<string>} paramProps - The `paramProps` parameter is used to map the actions parameters.
 */
export default function withInitialData(actions, paramProps = []) {
	return function wrapComponent(WrappedComponent) {
		class WithInitialData extends React.Component {
			constructor() {
				super();
				this.WrappedComponent = WrappedComponent;
			}

			static withInitialDataFetch(store, params) {
				return Promise.all(map(actions, action => store.dispatch(action(...map(paramProps, (prop) => params[prop])))));
			}

			_clientFetchData(params) {
				return map(actions, (value, action) => this.props[action](...map(paramProps, (prop) => params[prop])));
			}

			componentDidMount() {
				const params = pick(this.props, ...paramProps);
				this._clientFetchData(params);
			}

			componentWillReceiveProps(nextProps) {
				const currParams = pick(this.props, ...paramProps);
				const nextParams = pick(nextProps, ...paramProps);
				if (!isEqual(currParams, nextParams)) {
					this._clientFetchData(nextParams);
				}
			}

			render() {
				return <WrappedComponent {...this.props} />
			}
		}

		const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
		WithInitialData.displayName = `withInitialData(${wrappedComponentName})`;

		return hoistStatics(WithInitialData, WrappedComponent);
	}
}