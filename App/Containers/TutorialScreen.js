import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Pages } from 'react-native-pages';
import { Images } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TutorialScreenStyle';
import I18n from '../I18n';

import RoundedButton from '../Components/RoundedButton';

class TutorialScreen extends Component {
	onSkip = () => this.props.navigation.navigate('LandingScreen');

	renderTutorialItem = (img, i) => {
		return (
			<View key={i} style={styles.mainContainer}>
				<Image style={styles.tutorialImage} source={img} />
			</View>
		);
	};

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.container}>
					<Pages>{Images.tutorials.map(this.renderTutorialItem)}</Pages>
					<RoundedButton outline style={styles.skip} text={I18n.t('skip')} onPress={this.onSkip} />
				</View>
			</View>
		);
	}
}

export default TutorialScreen;
