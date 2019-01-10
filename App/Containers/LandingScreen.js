import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { Images } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LandingScreenStyle';
import I18n from '../I18n';

import RoundedButton from '../Components/RoundedButton';
import RichI18N from '../Components/RichI18N';

const mp4 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const hls = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';

class LandingScreen extends Component {
	static navigationOptions = {
		header: null,
		headerBackTitle: null
	};

	state = {
		muted: false
	};

	buttonStyle = (key) => {
		const text = I18n.t(key);
		if (key == 'singUp') return { text, style: styles.buttonSignUp };
		return { text, style: styles.button, textStyle: styles.buttonText };
	};

	onSignUp = () => this.props.navigation.navigate('SignupScreen');

	onLogin = () => this.props.navigation.navigate('LoginScreen');

	onLater = () => {};

	onTerms = () => {};

	toggleMute = () => {
		const { muted } = this.state;
		this.setState({ muted: !muted });
	};

	termsMaps = ({
		terms: <Text style={styles.underline} onPress={this.onTerms}>{I18n.t('terms')}</Text> 
	})

	render() {
		const { muted } = this.state;
		const { unmute, mute } = Images.icons;

		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<Video source={{ uri: hls }} style={styles.fullScreen} resizeMode="cover" muted={muted} repeat />

				<View style={styles.container}>
					<View style={styles.centered}>
						<Image source={Images.logoText} style={styles.logo} />
					</View>
					<View>
						<RoundedButton {...this.buttonStyle('signUp')} onPress={this.onSignUp} />
						<Text style={styles.text}>{I18n.t('alreadyHaveAnAccount')}</Text>
						<RoundedButton {...this.buttonStyle('login')} onPress={this.onLogin} />
						<RoundedButton {...this.buttonStyle('later')} onPress={this.onLater} />
						<RichI18N
							id="bySigningUpOrLoginYouAgreeToOurTerms"
							style={styles.termsText}
							values={this.termsMaps}
						/>
					</View>
				</View>
				<TouchableOpacity style={styles.muteToggle} onPress={this.toggleMute}>
					<Image source={muted ? mute : unmute} />
				</TouchableOpacity>
			</View>
		);
	}
}

export default LandingScreen;
