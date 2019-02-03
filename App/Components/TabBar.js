import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text, Platform, Image } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { SafeAreaView } from 'react-navigation';
import withDimensions from 'react-navigation-tabs/src/utils/withDimensions';

import styles, { isIOS11 } from './Styles/TabBarStyle';
import { Images } from '../Themes';

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

class TabBar extends Component {
	static defaultProps = {
		activeTintColor: '#007AFF',
		activeBackgroundColor: 'transparent',
		inactiveTintColor: '#8E8E93',
		inactiveBackgroundColor: 'transparent',
		showLabel: true,
		showIcon: true,
		allowFontScaling: true,
		adaptive: isIOS11
		// safeAreaInset: { bottom: 'never', top: 'never' }
	};

	state = {
		top: {
			tabBarVisible: true
		},
		bottom: {
			tabBarVisible: true,
			offset: new Animated.Value(0),
			opacity: new Animated.Value(1)
		}
	};

	componentWillReceiveProps(props) {
		const { type, navigation } = props;
		const { viewHeight, [type]: typeState } = this.state;

		const route = this._getActiveRoute(navigation.state);
		const params = route.params;

		const { [type]: typeParams } = params || {};

		if (typeParams) {
			const wasVisible = typeState.tabBarVisible;
			const isVisible = typeParams.tabBarVisible;

			if (type === 'bottom') {
				const { offset, opacity } = typeState;
				if (wasVisible && !isVisible) {
					Animated.timing(offset, { toValue: -viewHeight, duration: 200 }).start();
					Animated.timing(opacity, { toValue: 0, duration: 200 }).start();
					this.setState({ [type]: { ...typeState, tabBarVisible: false } });
				} else if (isVisible && !wasVisible) {
					Animated.timing(offset, { toValue: 0, duration: 200 }).start();
					Animated.timing(opacity, { toValue: 1, duration: 20 }).start();
					this.setState({ [type]: { ...typeState, tabBarVisible: true } });
				}
			}
		}
	}

	_getActiveRoute = (navigationState) => {
		const { routes, index } = navigationState;
		return routes ? this._getActiveRoute(routes[index]) : navigationState;
	};

	_renderLabel = ({ route, focused }) => {
		const { activeTintColor, inactiveTintColor, labelStyle, showLabel, showIcon, allowFontScaling } = this.props;

		if (showLabel === false) {
			return null;
		}

		const label = this.props.getLabelText({ route });
		const tintColor = focused ? activeTintColor : inactiveTintColor;

		if (typeof label === 'string') {
			return (
				<Animated.Text
					numberOfLines={1}
					style={[
						styles.label,
						{ color: tintColor },
						showIcon && this._shouldUseHorizontalLabels() ? styles.labelBeside : styles.labelBeneath,
						labelStyle
					]}
					allowFontScaling={allowFontScaling}
				>
					{label}
				</Animated.Text>
			);
		}

		if (typeof label === 'function') {
			return label({ route, focused, tintColor });
		}

		return label;
	};

	_renderIcon = ({ route, focused }) => {
		const { activeTintColor, inactiveTintColor, renderIcon, showIcon, showLabel, iconStyle } = this.props;

		if (showIcon === false) {
			return null;
		}

		const horizontal = this._shouldUseHorizontalLabels();

		const activeOpacity = focused ? 1 : 0;
		const inactiveOpacity = focused ? 0 : 1;

		const style = [
			styles.iconWithExplicitHeight,
			showLabel === false && !horizontal && styles.iconWithoutLabel,
			showLabel !== false && !horizontal && styles.iconWithLabel
		];

		return (
			<View style={style}>
				<Animated.View style={[ styles.icon, iconStyle, { opacity: activeOpacity } ]}>
					{renderIcon({
						route,
						focused: true,
						horizontal,
						tintColor: activeTintColor
					})}
				</Animated.View>
				<Animated.View style={[ styles.icon, iconStyle, { opacity: inactiveOpacity } ]}>
					{renderIcon({
						route,
						focused: false,
						horizontal,
						tintColor: inactiveTintColor
					})}
				</Animated.View>
			</View>
		);
	};

	_shouldUseHorizontalLabels = () => {
		const { routes } = this.props.navigation.state;
		const { isLandscape, dimensions, adaptive, tabStyle } = this.props;

		if (!adaptive) {
			return false;
		}

		if (Platform.isPad) {
			let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH;

			const flattenedStyle = StyleSheet.flatten(tabStyle);

			if (flattenedStyle) {
				if (typeof flattenedStyle.width === 'number') {
					maxTabItemWidth = flattenedStyle.width;
				} else if (typeof flattenedStyle.maxWidth === 'number') {
					maxTabItemWidth = flattenedStyle.maxWidth;
				}
			}

			return routes.length * maxTabItemWidth <= dimensions.width;
		} else {
			return isLandscape;
		}
	};

	_onLayout = ({ nativeEvent: { layout } }) => {
		this.setState({ viewHeight: layout.height });
	};

	render() {
		const {
			navigation,
			activeBackgroundColor,
			inactiveBackgroundColor,
			onTabPress,
			onTabLongPress,
			safeAreaInset,
			style,
			tabStyle,
			type,
			acceptRoutes,
			backgroundImage
		} = this.props;

		const { [type]: { tabBarVisible, offset, opacity } } = this.state;
		const { routes } = navigation.state;

		const pointerEvents = tabBarVisible ? 'auto' : 'none';
		const tabBarStyle = [
			type === 'bottom' ? { marginBottom: offset, opacity } : undefined,
			styles.tabBar,
			this._shouldUseHorizontalLabels() && !Platform.isPad ? styles.tabBarCompact : styles.tabBarRegular,
			style
		];

		return (
			<View pointerEvents={pointerEvents} onLayout={this._onLayout}>
				<SafeAreaView style={tabBarStyle} forceInset={safeAreaInset}>
					{backgroundImage && <Image source={backgroundImage} style={styles.backgroundImage} />}
					{routes.map((route, index) => {
						if (acceptRoutes && !acceptRoutes.includes(route.key)) return null;

						const focused = index === navigation.state.index;
						const scene = { route, focused };
						const accessibilityLabel = this.props.getAccessibilityLabel({ route });
						const testID = this.props.getTestID({ route });

						const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;

						const ButtonComponent = this.props.getButtonComponent({ route }) || TouchableBounce;

						return (
							<ButtonComponent
								key={route.key}
								onPress={() => onTabPress({ route })}
								onLongPress={() => onTabLongPress({ route })}
								testID={testID}
								accessibilityLabel={accessibilityLabel}
								style={[
									styles.tab,
									{ backgroundColor },
									this._shouldUseHorizontalLabels() ? styles.tabLandscape : styles.tabPortrait,
									tabStyle
								]}
							>
								{this._renderIcon(scene)}
								{this._renderLabel(scene)}
							</ButtonComponent>
						);
					})}
				</SafeAreaView>
			</View>
		);
	}
}

export default withDimensions(TabBar);

const topTabBarIcon = (key) => ({ focused }) => (
	<View style={styles.topTab}>
		<Image source={Images[key].normal} />
		<Text style={styles.topTabText}>{key.toUpperCase()}</Text>
		{focused && <Image style={styles.topTabIndicator} source={Images.tabSelect} />}
	</View>
);

const bottomTabBarIcon = (key) => ({ focused }) => (
	<Image source={focused ? Images[key].focused : Images[key].normal} />
);

export { topTabBarIcon, bottomTabBarIcon };
