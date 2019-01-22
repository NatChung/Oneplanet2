import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TermsScreenStyle';
import I18n from '../I18n';

const renderHeaderLeft = (navigation) => (
	<TouchableOpacity onPress={() => navigation.goBack()}>
		<Text style={styles.headerLeft}>{I18n.t('cancel')}</Text>
	</TouchableOpacity>
);

class TermsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: I18n.t('terms'),
		header: undefined,
		headerStyle: styles.header,
		headerTitleStyle: styles.headerTitle,
		headerLeft: renderHeaderLeft(navigation)
	});

	render() {
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.termsText}>TermsScreen</Text>
			</View>
		);
	}
}

export default TermsScreen;
