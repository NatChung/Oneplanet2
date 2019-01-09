import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Pages } from 'react-native-pages';
import { Images } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TutorialScreenStyle';
import RoundedButton from '../Components/RoundedButton';

class TutorialScreen extends Component {
	onSkip = () => this.props.navigation.navigate('LandingScreen');

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.container}>
					<Pages>
						{Images.tutorials.map((img, i) => <Image key={i} style={styles.tutorialImage} source={img} />)}
					</Pages>
					<RoundedButton outline style={styles.skip} text="Skip" onPress={this.onSkip} />
				</View>
			</View>
		);
	}
}

export default TutorialScreen;
