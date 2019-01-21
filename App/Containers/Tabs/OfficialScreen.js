import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

// Styles
import styles from './Styles/OfficialScreenStyle';

class OfficialScreen extends Component {
	static navigationOptions = {};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>OfficialScreen</Text>
			</ScrollView>
		);
	}
}

export default OfficialScreen;
