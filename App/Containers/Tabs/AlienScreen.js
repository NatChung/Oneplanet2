import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/AlienScreenStyle';

class AlienScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('alien')
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>AlienScreen</Text>
			</ScrollView>
		);
	}
}

export default AlienScreen;
