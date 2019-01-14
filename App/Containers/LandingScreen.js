import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Video from 'react-native-video';
import { Images } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LandingScreenStyle';
import I18n from '../I18n';

import RoundedButton from '../Components/RoundedButton';
import RichI18n from '../Components/RichI18n';

const mp4 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const hls = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';

class LandingScreen extends Component {
	static navigationOptions = {
		header: null,
		headerTransparent: true,
		headerBackTitle: null
	};

	state = {
		focused: true,
		muted: false
	};

	componentDidMount() {
		const { navigation } = this.props;
		this.subscriptions = [
			navigation.addListener('willFocus', () => this.setState({ focused: true })),
			navigation.addListener('willBlur', () => this.setState({ focused: false }))
		];
	}

	componentWillUnmount() {
		this.subscriptions.forEach((subscription) => subscription.remove());
	}

	buttonStyle = (key) => {
		const text = I18n.t(key);
		if (key == 'signUp') return { text, style: styles.buttonSignUp };
		return { text, style: styles.button, textStyle: styles.buttonText };
	};

	onSignUp = () => this.props.navigation.navigate('SignupScreen');

	onLogin = () => this.props.navigation.navigate('LoginScreen');

	onLater = () => {};

	onTerms = () => this.props.navigation.navigate('TermsScreen');

	toggleMute = () => {
		const { muted } = this.state;
		this.setState({ muted: !muted });
	};

	richI18nMaps = () => ({
		terms: <Text style={styles.underline} onPress={this.onTerms}>{I18n.t('terms')}</Text>
	});

	render() {
		const { focused, muted } = this.state;
		const { unmute, mute } = Images.icons;

		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<Video
					source={{ uri: hls }}
					style={styles.fullScreen}
					resizeMode="cover"
					paused={!focused}
					muted={muted}
					repeat
				/>
				<View style={styles.container}>
					<View style={styles.centered}>
						<Image source={Images.logoText} style={styles.logo} />
					</View>
					<View>
						<RoundedButton {...this.buttonStyle('signUp')} onPress={this.onSignUp} />
						<Text style={styles.text}>{I18n.t('alreadyHaveAnAccount')}</Text>
						<RoundedButton {...this.buttonStyle('login')} onPress={this.onLogin} />
						<RoundedButton {...this.buttonStyle('later')} onPress={this.onLater} />
						<RichI18n
							id="bySigningUpOrLoginYouAgreeToOurTerms"
							style={styles.termsText}
							values={this.richI18nMaps()}
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
