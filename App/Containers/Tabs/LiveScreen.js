import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/LiveScreenStyle';

class LiveScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('live')
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>LiveScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default LiveScreen;
