import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/OfficialScreenStyle';

class OfficialScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('official')
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>OfficialScreen</Text>
			</ScrollView>
		);
	}
}

export default OfficialScreen;
