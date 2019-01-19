import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/PartyScreenStyle';

class PartyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: topTabBarIcon('party')
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>PartyScreen</Text>
			</ScrollView>
		);
	}
}

export default PartyScreen;
