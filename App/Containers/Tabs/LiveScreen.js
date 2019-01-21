import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/LiveScreenStyle';

class LiveScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('live')
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>LiveScreen</Text>
			</ScrollView>
		);
	}
}

export default LiveScreen;