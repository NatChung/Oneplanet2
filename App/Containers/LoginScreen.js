import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { Images } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';
import I18n from '../I18n';

import SocailMediaButtons from '../Components/SocailMediaButtons';
import RoundedButton from '../Components/RoundedButton';
import RoundedTextInput from '../Components/RoundedTextInput';

class LoginScreen extends Component {
	static navigationOptions = {
		title: I18n.t('login'),
		headerTransparent: true,
		headerTintColor: 'white'
	};

	state = {
		email: null,
		password: null
	};

	onFb = () => {};
	onTwitter = () => {};
	onGoogle = () => {};
	onWechat = () => {};

	emailInputProps = () => ({
		value: this.state.email,
		onChangeText: (email) => this.setState({ email }),
		placeholder: I18n.t('usernameOrEmail'),
		placeholderTextColor: 'grey'
	});

	passwordInputProps = () => ({
		secureTextEntry: true,
		value: this.state.password,
		onChangeText: (password) => this.setState({ password }),
		placeholder: I18n.t('password'),
		placeholderTextColor: 'grey'
	});

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.socailMediaContainer}>
					<SocailMediaButtons
						onWechat={this.onWechat}
						onTwitter={this.onTwitter}
						onGoogle={this.onGoogle}
						onFb={this.onFb}
					/>
					<Text style={styles.text}>{I18n.t('or')}</Text>
				</View>
				<View style={styles.inputGroupContainer}>
					<RoundedTextInput {...this.emailInputProps()} />
					<RoundedTextInput {...this.passwordInputProps()} />
					<RoundedButton
						disabled
						style={styles.loginButton}
						text={I18n.t('login')}
						onPress={() => console.tron.log(this.state.email, this.state.password)}
					/>
				</View>
			</View>
		);
	}
}

export default LoginScreen;
