import React, { Component } from 'react';
import { Image, Text, View, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { Images } from '../Themes';
import _ from 'lodash';
import validator from 'validator';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';
import I18n from '../I18n';

import SocailMediaButtons from '../Components/SocailMediaButtons';
import RoundedButton from '../Components/RoundedButton';
import RoundedTextInput from '../Components/RoundedTextInput';
import RichI18n from '../Components/RichI18n';
import { Signin, Signup } from "../Lib/Auth"
import { ApolloConsumer } from 'react-apollo'
import Toast from 'react-native-easy-toast'

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
			return true;
		},
		password: (value) => {
			if (validator.isLength(value, { max: 5 })) return false;
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

	onFb = client => async () => {
		const {error, profile} = await Signin.fb(client)
		if(error && error.message ) Alert.alert(I18n.t('Error'), error.message)
		if(profile) this.props.navigation.navigate('LaunchScreen')
	}

	onTwitter = client => async () => {
		const {error, profile} = await Signin.twitter(client)
		if(error && !error.domain && error.message ) Alert.alert(I18n.t('Error'), error.message)
		if(profile) this.props.navigation.navigate('LaunchScreen')
	}
	onGoogle = client => async () => {
		const {error, profile} = await Signin.google(client)
		if(error && !error.domain && error.message ) Alert.alert(I18n.t('Error'), error.message)
		if(profile) this.props.navigation.navigate('LaunchScreen')
	}

	onWechat = () => {};

	onLogin = async () => {
		const { account, password } = this.state;

		try {
			const user = await Auth.signIn(account, password);
			console.tron.log('user:', user);
			Alert.alert('[DEV] Success', user.username);
		} catch (error) {
			const exceptionMaps = {
				UserNotFoundException: {
					title: I18n.t('incorrectEmail'),
					message: I18n.t('theEmailYouEnteredDoesntAppearToBelongToAnAccountPleaseCheckYourEmailAndTryAgain')
				},
				NotAuthorizedException: {
					title: I18n.t('incorrectPasswordForAccount', { account }),
					message: I18n.t('thePasswordYouEnteredIsIncorrectPleaseTryAgain')
				}
			};
			const { code, name, message } = error;
			console.tron.log('error:', error);
			if (_.has(exceptionMaps, code)) {
				const { title, message } = exceptionMaps[code];
				Alert.alert(title, message, [ { text: I18n.t('tryAgain') } ]);
			} else {
				Alert.alert(name, message);
			}
		}
	};

	checkAndConfirmAccount = (account, title, message) => new Promise((resolve) => {
		if (!account) return resolve(false)

		if (!validator.isEmail(account)) {
			Alert.alert('Error', I18n.t('incorrectEmail'));
			return resolve(false)
		}

		Alert.alert(title,message,
			[
				{ text: I18n.t('cancel'), onPress: () => resolve(false), style: 'cancel' },
				{ text: I18n.t('ok'), onPress: () => resolve(true) }
			],
			{ cancelable: false }
		);
	})

	onResendEmail = async () => {
		const { account } = this.state;
		const isNeedResend = await this.checkAndConfirmAccount(account, I18n.t('sendANewPassword'), I18n.t('theOldPasswordWillBeInvalidOk'))
		if (isNeedResend) {
			const {error, _} = await Signup.emailResend(account)
			if(error && error.message) return Alert.alert(I18n.t('Error'), error.message)
			this.toast.show(I18n.t('resendSuccess'))
		}
	};

	onForgotPassword = client => async () => {
		const { account } = this.state;
		const isNeedResend = await this.checkAndConfirmAccount(account, I18n.t('forgetPassword'), I18n.t('theOldPasswordWillBeInvalidOk'))
		if(isNeedResend){
			const {error, _} = await Signin.emailForgetPassword(client, account)
			if(error && error.message) return Alert.alert(I18n.t('Error'), error.message)
			this.props.navigation.navigate('ForgetPasswordScreen', {account})
		}
	}

	handleInputChange = (fieldName) => (value) => {
		this.setState({ [fieldName]: validator.trim(value) }, this.validate);
	};

	accountInputProps = () => ({
		containerStyle: styles.textInputContainer,
		value: this.state.account,
		onChangeText: this.handleInputChange('account'),
		placeholder: I18n.t('email'),
		placeholderTextColor: 'grey',
		autoCapitalize: 'none'
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
					<ApolloConsumer>
						{client => (<SocailMediaButtons
							onFb={this.onFb(client)}
							onTwitter={this.onTwitter(client)}
							onGoogle={this.onGoogle(client)}
							onWechat={this.onWechat}
						/>)}
					</ApolloConsumer>
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

						<ApolloConsumer>
							{client => (<Text style={styles.passwordTips} onPress={this.onForgotPassword(client)}>
								{I18n.t('forgotPassword')}
							</Text>)}
						</ApolloConsumer>
					</View>
					<RoundedButton {...this.loginButtonProps()} />
				</View>
				<Toast ref={ref => this.toast = ref} position='center'/>
			</View>
		);
	}
}

export default LoginScreen;
