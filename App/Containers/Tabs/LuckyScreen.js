import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/LuckyScreenStyle';

class LuckyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('lucky')
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>LuckyScreen</Text>
			</ScrollView>
		);
	}
}

export default LuckyScreen;
