import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/MyScreenStyle';

class MyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('my')
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>MyScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default MyScreen;
