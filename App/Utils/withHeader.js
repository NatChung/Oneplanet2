import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

/**
 * @deprecated just use header: undefined
 */
export default function withHeader(WrappedComponent) {
	class EnhancedComponent extends Component {
		static displayName = `withHeader(${WrappedComponent.displayName})`;

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	const hoist = hoistNonReactStatic(EnhancedComponent, WrappedComponent);

	hoist.navigationOptions = (props) => {
		const { navigationOptions } = props;
		const wrappedOptions = (({ navigationOptions }) =>
			typeof navigationOptions === 'function' 
				? navigationOptions(props) 
				: navigationOptions
		)(WrappedComponent);

		return { ...navigationOptions, header: undefined, ...wrappedOptions };
	};

	return hoist;
}
