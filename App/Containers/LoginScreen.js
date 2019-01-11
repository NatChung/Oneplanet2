import React, { Component } from 'react';
import { Image, Text, View, Alert } from 'react-native';
import { Images } from '../Themes';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';
import I18n from '../I18n';

import SocailMediaButtons from '../Components/SocailMediaButtons';
import RoundedButton from '../Components/RoundedButton';
import RoundedTextInput from '../Components/RoundedTextInput';
import RichI18n from '../Components/RichI18n';

class LoginScreen extends Component {
	static navigationOptions = {
		title: I18n.t('login'),
		headerTransparent: true,
		headerTintColor: 'white'
	};

	state = {
		account: null,
		password: null,
		isLoginDisabled: true
	};

	validations = {
		account: (value) => {
			if (value.length == 0) return false;
			return true;
		},
		password: (value) => {
			if (value.length < 6) return false;
			return true;
		}
	};

	validate = () => {
		const isValid = _.every(this.validations, (validate, key) => {
			const value = this.state[key];
			return value && validate(value);
		});
		this.setState({ isLoginDisabled: !isValid });
	};

	onFb = () => {};
	onTwitter = () => {};
	onGoogle = () => {};
	onWechat = () => {};

	onLogin = () => {
		const { account } = this.state;
		const incorrectMaps = {
			account: {
				title: I18n.t('incorrectUsername'),
				message: I18n.t('theUsernameYouEnteredDoesntAppearToBelongToAnAccountPleaseCheckYourUsernameAndTryAgain')
			},
			password: {
				title: I18n.t('incorrectPasswordForAccount', { account }),
				message: I18n.t('thePasswordYouEnteredIsIncorrectPleaseTryAgain')
			}
		};
		const type = 'account';
		const { title, message } = incorrectMaps[type];
		Alert.alert(title, message, [ { text: I18n.t('tryAgain') } ]);
	};

	onResendEmail = () => {};

	onForgotPassword = () => {};

	handleInputChange = (fieldName) => (value) => {
		this.setState({ [fieldName]: value }, this.validate);
	};

	accountInputProps = () => ({
		containerStyle: styles.textInputContainer,
		value: this.state.account,
		onChangeText: this.handleInputChange('account'),
		placeholder: I18n.t('usernameOrEmail'),
		placeholderTextColor: 'grey'
	});

	passwordInputProps = () => ({
		containerStyle: styles.textInputContainer,
		value: this.state.password,
		onChangeText: this.handleInputChange('password'),
		placeholder: I18n.t('password'),
		placeholderTextColor: 'grey',
		secureTextEntry: true
	});

	loginButtonProps = () => ({
		style: styles.loginButton,
		text: I18n.t('login'),
		onPress: this.onLogin,
		disabled: this.state.isLoginDisabled
	});

	richI18nMaps = () => ({
		resendTheEmail: <Text onPress={this.onResendEmail}>{I18n.t('resendTheEmail')}</Text>
	});

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.socailMediaContainer}>
					<SocailMediaButtons
						onFb={this.onFb}
						onTwitter={this.onTwitter}
						onGoogle={this.onGoogle}
						onWechat={this.onWechat}
					/>
					<Text style={styles.text}>{I18n.t('or')}</Text>
				</View>
				<View style={styles.inputGroupContainer}>
					<View style={styles.inputGroup}>
						<RoundedTextInput {...this.accountInputProps()} />
						<RichI18n
							id="youDidNotReceiveTheEmailResendTheEmail"
							style={styles.emailTips}
							values={this.richI18nMaps()}
						/>
					</View>
					<View style={styles.inputGroup}>
						<RoundedTextInput {...this.passwordInputProps()} />
						<Text style={styles.passwordTips} onPress={this.onForgotPassword}>
							{I18n.t('forgotPassword')}
						</Text>
					</View>
					<RoundedButton {...this.loginButtonProps()} />
				</View>
			</View>
		);
	}
}

export default LoginScreen;
