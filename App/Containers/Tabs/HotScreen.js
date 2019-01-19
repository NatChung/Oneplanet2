import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { topTabBarIcon } from '../../Components/TabBar';

// Styles
import styles from './Styles/HotScreenStyle';

class HotScreen extends Component {
  static navigationOptions = {
		tabBarIcon: topTabBarIcon('hot')
  };
  
	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Text>HotScreen</Text>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default HotScreen;
