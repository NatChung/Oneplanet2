import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/OfficialScreenStyle';

class OfficialScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('official')
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>OfficialScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default OfficialScreen;
