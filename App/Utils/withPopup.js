import React, { Component } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function withPopup(WrappedComponent) {
	const { height } = Dimensions.get('window');

	class EnhancedComponent extends Component {
		static displayName = `withPopup(${WrappedComponent.displayName})`;

		state = {
			translateY: new Animated.Value(height)
		};

		componentDidMount() {
			this.animate(this.state.translateY, { duration: 250, toValue: 0 });
		}

		animate = (value, config) => {
			return new Promise((resolve) => {
				Animated.timing(value, { useNativeDriver: true, ...config }).start(resolve);
			});
		};

		close = () => {
			this.animate(this.state.translateY, { duration: 250, toValue: height });
			this.props.navigation.goBack();
		};

		render() {
			const { translateY } = this.state;

			return (
				<View style={styles.mainContainer}>
					<Animated.View style={[ styles.container, { transform: [ { translateY } ] } ]}>
						<WrappedComponent {...this.props} close={this.close} />
					</Animated.View>
				</View>
			);
		}
	}

	return hoistNonReactStatic(EnhancedComponent, WrappedComponent);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	container: {
		flex: 1,
		justifyContent: 'center'
	}
});
