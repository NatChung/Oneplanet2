import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

// Styles
import styles from './Styles/RankingScreenStyle';

class RankingScreen extends Component {
	static navigationOptions = {};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>RankingScreen</Text>
			</ScrollView>
		);
	}
}

export default RankingScreen;
