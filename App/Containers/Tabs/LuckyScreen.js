import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/LuckyScreenStyle';

class LuckyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('lucky')
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>LuckyScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default LuckyScreen;
