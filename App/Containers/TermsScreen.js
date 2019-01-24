import React, { Component } from 'react';
import { Text, WebView } from 'react-native';
import { TouchableOpacity } from 'react-native';

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
			<WebView style={styles.mainContainer}
  				source={require('../Policy.html')}
  				style={{flex: 1}}/>
		);
	}
}

export default TermsScreen;
