import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { polyfill } from 'react-lifecycles-compat';
import { ScreenContainer } from 'react-native-screens';
import { BottomTabBar } from 'react-navigation';
import { createTabNavigator } from 'react-navigation-tabs';
import ResourceSavingScene from 'react-navigation-tabs/src/views/ResourceSavingScene';

import TreasureBar from '../../Components/TreasureBar';

class TabNavigationView extends PureComponent {
	static defaultProps = {
		lazy: true
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const { index } = nextProps.navigation.state;

		return {
			// Set the current tab to be loaded if it was not loaded before
			loaded: prevState.loaded.includes(index) ? prevState.loaded : [ ...prevState.loaded, index ]
		};
	}

	state = {
		loaded: [ this.props.navigation.state.index ]
	};

	_renderTabBar = (type) => {
		const {
			tabBarComponent: TabBarComponent = BottomTabBar,
			tabBarOptions,
			navigation,
			screenProps,
			getLabelText,
			getAccessibilityLabel,
			getButtonComponent,
			getTestID,
			renderIcon,
			onTabPress,
			onTabLongPress,
			customOptions
		} = this.props;

		const { descriptors } = this.props;
		const { state } = this.props.navigation;
		const route = state.routes[state.index];
		const descriptor = descriptors[route.key];
		const options = descriptor.options;

		if (options.tabBarVisible === false) {
			return null;
		}

		return (
			<TabBarComponent
				{...tabBarOptions}
				{...customOptions[type]}
				type={type}
				jumpTo={this._jumpTo}
				navigation={navigation}
				screenProps={screenProps}
				onTabPress={onTabPress}
				onTabLongPress={onTabLongPress}
				getLabelText={getLabelText}
				getButtonComponent={getButtonComponent}
				getAccessibilityLabel={getAccessibilityLabel}
				getTestID={getTestID}
				renderIcon={renderIcon}
			/>
		);
	};

	_renderTreasureBar = () => {
		return <TreasureBar style={styles.treasureBar} {...this.props} />;
	};

	_jumpTo = (key) => {
		const { navigation, onIndexChange } = this.props;

		const index = navigation.state.routes.findIndex((route) => route.key === key);

		onIndexChange(index);
	};

	render() {
		const { navigation, renderScene, lazy } = this.props;
		const { routes } = navigation.state;
		const { loaded } = this.state;

		return (
			<View style={[ styles.container, styles.reverse ]}>
				{this._renderTreasureBar()}
				{this._renderTabBar('top')}
				<ScreenContainer style={styles.pages}>
					{routes.map((route, index) => {
						if (lazy && !loaded.includes(index)) {
							// Don't render a screen if we've never navigated to it
							return null;
						}

						const isFocused = navigation.state.index === index;

						return (
							<ResourceSavingScene key={route.key} style={StyleSheet.absoluteFill} isVisible={isFocused}>
								{renderScene({ route })}
							</ResourceSavingScene>
						);
					})}
				</ScreenContainer>
				{this._renderTabBar('bottom')}
			</View>
		);
	}
}

polyfill(TabNavigationView);

export default createTabNavigator(TabNavigationView);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'hidden'
	},
	treasureBar: {
		zIndex: 3
	},
	pages: {
		flex: 1
	}
});
