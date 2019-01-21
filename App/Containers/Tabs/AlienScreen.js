import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

// Styles
import styles from './Styles/AlienScreenStyle';

class AlienScreen extends Component {
	static navigationOptions = {};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>AlienScreen</Text>
			</ScrollView>
		);
	}
}

export default AlienScreen;
