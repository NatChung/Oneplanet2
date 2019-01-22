import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

// Styles
import styles from './Styles/LiveScreenStyle';

class LiveScreen extends Component {
	static navigationOptions = {};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>LiveScreen</Text>
			</ScrollView>
		);
	}
}

export default LiveScreen;
