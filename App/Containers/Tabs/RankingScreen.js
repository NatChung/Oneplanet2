import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/RankingScreenStyle';

class RankingScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('ranking')
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>RankingScreen</Text>
			</ScrollView>
		);
	}
}

export default RankingScreen;
