import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function withCollapsible(WrappedComponent) {
	class EnhancedComponent extends Component {
		static displayName = `withCollapsible(${WrappedComponent.displayName})`;

		state = {
			scrollY: 0,
			bottom: { tabBarVisible: true },
			dragging: false
		};

		onScroll = async ({ nativeEvent: { contentOffset } }) => {
			const { navigation } = this.props;
			const { dragging, scrollY } = this.state;
			const scrollOffsetY = contentOffset.y;

			const threshold = 20;
			const delta = scrollOffsetY - scrollY;
			const shouldShowTabBar = delta < 0;

			if (dragging && Math.abs(delta) > threshold) {
				navigation.setParams({ bottom: { tabBarVisible: shouldShowTabBar } });
				this.setState({ bottom: { tabBarVisible: shouldShowTabBar } });
			}

			scrollOffsetY >= 0 && this.setState({ scrollY: scrollOffsetY });
		};

		onScrollBeginDrag = () => this.setState({ dragging: true });

		onScrollEndDrag = () => this.setState({ dragging: false });

		render() {
			const { bottom: { tabBarVisible } } = this.state;
			const forceInset = { bottom: tabBarVisible ? 'never' : 'always' };
			const props = {
				...this.props,
				collapsible: {
					onScrollBeginDrag: this.onScrollBeginDrag,
					onScrollEndDrag: this.onScrollEndDrag,
					onScroll: this.onScroll,
					// scrollEventThrottle: 14
				}
			};

			return (
				<View style={{ flex: 1 }}>
					<SafeAreaView style={{ flex: 1 }} forceInset={forceInset}>
						<WrappedComponent {...props} />
					</SafeAreaView>
				</View>
			);
		}
	}

	return hoistNonReactStatic(EnhancedComponent, WrappedComponent);
}
