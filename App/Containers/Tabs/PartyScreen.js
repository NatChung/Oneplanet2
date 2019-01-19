import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/PartyScreenStyle';

class PartyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('party')
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>PartyScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default PartyScreen;
