import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

// Styles
import styles from './Styles/MyScreenStyle';

class MyScreen extends Component {
	static navigationOptions = {};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>MyScreen</Text>
			</ScrollView>
		);
	}
}

export default MyScreen;
