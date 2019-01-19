import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/MyScreenStyle';

class MyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('my')
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>MyScreen</Text>
			</ScrollView>
		);
	}
}

export default MyScreen;
