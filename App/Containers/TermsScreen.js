import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TermsScreenStyle';
import I18n from '../I18n';

class TermsScreen extends Component {
	static navigationOptions = {
		title: I18n.t('terms'),
		headerStyle: styles.header,
		headerTitleStyle: styles.headerTitle,
		headerBackTitle: I18n.t('cancel')
	};

	render() {
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.termsText}>TermsScreen</Text>
			</View>
		);
	}
}

export default TermsScreen;
