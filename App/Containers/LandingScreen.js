import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { Images } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LandingScreenStyle';
import RoundedButton from '../Components/RoundedButton';

const mp4 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const hls = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';

class LandingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			muted: false
		};
	}

	buttonStyle = (text) => {
		if (text == 'Sign Up') return { text, style: styles.buttonSignUp };
		return { text, style: styles.button, textStyle: styles.buttonText };
	};

	onSignUp = () => {};

	onLogin = () => {};

	onLater = () => {};

	onTerms = () => {};

	toggleMute = () => {
		const { muted } = this.state;
		this.setState({ muted: !muted });
	};

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
						<RoundedButton {...this.buttonStyle('Sign Up')} onPress={this.onSignUp} />
						<Text style={styles.text}>Already have an account?</Text>
						<RoundedButton {...this.buttonStyle('Login')} onPress={this.onLogin} />
						<RoundedButton {...this.buttonStyle('Later')} onPress={this.onLater} />
						<Text style={styles.termsText}>
							By signing up or login, you agree to our{' '}
							<Text style={styles.underline} onPress={this.onTerms}>
								Terms
							</Text>.
						</Text>
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
