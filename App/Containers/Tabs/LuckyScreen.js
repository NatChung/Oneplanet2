import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';
import CountDownClock from '../../Components/CountDownClock'
import { Images } from "../../Themes";
// Styles
import styles from './Styles/LuckyScreenStyle';

class LuckyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('lucky')
	};

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<CountDownClock seconds={this.props.countdown} />
			</View>
		);
	}
}

export default LuckyScreen;
