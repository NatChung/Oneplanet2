import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Header } from 'react-navigation';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function withHeader(WrappedComponent) {
	const { width } = Dimensions.get('window');

	class EnhancedComponent extends Component {
		static displayName = `withHeader(${WrappedComponent.displayName})`;

		state = {};

		render() {
			const { navigation } = this.props;
			const { navigationOptions } = WrappedComponent;
      const options = typeof navigationOptions === 'function' 
        ? navigationOptions(navigation) 
        : navigationOptions;
			const scene = {
				key: navigation.state.key,
				index: 1,
				isActive: true,
				descriptor: { navigation, options }
			};
			const props = {
				navigation: { state: { index: 1 } },
				layout: { initWidth: width },
				layoutPreset: 'center',
				scenes: [ scene ],
				scene
			};
			return (
				<View style={{ flex: 1 }}>
					<Header {...props} />
					<WrappedComponent {...this.props} {...this.state} />
				</View>
			);
		}
	}

	return hoistNonReactStatic(EnhancedComponent, WrappedComponent);
}
