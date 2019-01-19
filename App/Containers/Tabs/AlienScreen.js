import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/AlienScreenStyle';

class AlienScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('alien')
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>AlienScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default AlienScreen;
