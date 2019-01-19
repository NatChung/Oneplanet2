import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/RankingScreenStyle';

class RankingScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('ranking')
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>RankingScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default RankingScreen;
