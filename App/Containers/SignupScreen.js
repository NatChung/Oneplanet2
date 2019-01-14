import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { Images } from '../Themes'
import I18n from "../I18n"
import validator from 'validator'
import _ from 'lodash'
import SocailMediaButtons from "../Components/SocailMediaButtons"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput"
// Styles
import styles from './Styles/SingupScreenStyle'

class SignupScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: I18n.t('signUp'),
    headerTransparent:true,
    headerTintColor:'white',
  })

  state = {
    email:null,
    emailError: null,
    password: null,
    passwordError: null,
    signupDisabled: true
  }

  onFb = () => {}
  onTwitter = () => {}
  onGoogle= () => {}
  onWechat = () => {}

  onSignup = async () => {
    const { password, email } = this.state
    this.props.navigation.navigate('AddProfileScreen', {password, email})
  }

  onCheckEamil = () => {
    if(!this.state.email) return
    const emailError = validator.isEmail(this.state.email) ? null : I18n.t('incorrectEmail')
    this.setState({emailError })
  }

  onCheckPassowrd = () => {
    if(!this.state.password) return
    const passwordError = validator.isLength(this.state.password, { max: 5 }) ? I18n.t('incorrectPassword') : null
    this.setState({passwordError})
  }

  emailInputProps = () => ({
    value:this.state.email,
    onChangeText:this.handleInputChange('email'),
    placeholder:I18n.t('emailAddress'),
    placeholderTextColor:'grey',
    error: this.state.emailError,
    onBlur: this.onCheckEamil
  })

  passwordInputProps = () => ({
    secureTextEntry:true,
    value:this.state.password,
    onChangeText:this.handleInputChange('password'),
    placeholder:I18n.t('password'),
    placeholderTextColor:'grey',
    error: this.state.passwordError,
    onBlur: this.onCheckPassowrd
  })

  signupButtonProps = () => ({
    text:I18n.t('signUp'),
    onPress:this.onSignup,
    style: styles.signupButton,
    disabled: this.state.signupDisabled
  })

  validations = {
		email: (value) => validator.isEmail(value),
		password: (value) => !(validator.isLength(value, { max: 5 }))
	}

	validate = () => {
		const isValid = _.every(this.validations, (validate, key) => {
			const value = this.state[key];
			return value && validate(value);
		});
		this.setState({ signupDisabled: !isValid });
  }
  
  handleInputChange = (fieldName) => (value) => {
    this.setState({ [fieldName]: validator.trim(value) }, this.validate);
    if(this.state.passwordError)  this.onCheckPassowrd()
    if(this.state.emailError) this.onCheckEamil()
	}

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.loginBackground} style={styles.backgroundImage} />
        <View style={styles.socailMediaContainer}>
          <SocailMediaButtons 
            onWechat={this.onWechat}
            onTwitter={this.onTwitter}
            onGoogle={this.onGoogle}
            onFb={this.onFb} />
            <Text style={styles.quickTitle}>{I18n.t('quickRegisteration')}</Text>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>{I18n.t('orSignUpWithEmail')}</Text>
          <RoundedTextInput {...this.emailInputProps()}/>
          <RoundedTextInput {...this.passwordInputProps()}/>
          <RoundedButton {...this.signupButtonProps()} />
        </View>
      </View>
    )
  }
}


export default SignupScreen
