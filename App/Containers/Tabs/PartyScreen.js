import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

// Styles
import styles from './Styles/PartyScreenStyle';

class PartyScreen extends Component {
	static navigationOptions = {};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>PartyScreen</Text>
			</ScrollView>
		);
	}
}

export default PartyScreen;
