import React, { Component } from 'react'
import { TextInput, Text, View, Button, Alert } from 'react-native'
import I18n from "../I18n";
import validator from 'validator'
import _ from 'lodash'
import { Signin } from "../Lib/Auth";
// Styles

import styles from './Styles/ForgetPasswordScreenStyle'

const TitleInput = props => (
  <View style={styles.titleInputContainer}>
    <Text style={styles.titleText}>{props.title}</Text>
    <TextInput {...props} style={styles.titleInput}/>
  </View>
)

class ForgetPasswordScreen extends Component {

  static navigationOptions = ({ navigation }) =>({
    title: I18n.t('forgetPassword'),
    headerTintColor:'white',
    headerStyle: {
      backgroundColor: '#191919',
    },
    headerRight: navigation.getParam('rightButton')
  })

  state = {
    verifyCode:null,
    password: null,
    confirmPassword: null,
    loading: false
  }

  onDonePress = async () => {
    console.tron.log('onDonePress')
    const {verifyCode, password, confirmPassword} = this.state
    const account = this.props.navigation.getParam('account')
    if(password != confirmPassword) return Alert.alert(I18n.t('error'), I18n.t('passwordIsDifferent'))

    const {error, result} =  await Signin.emailForgotPasswordSubmit(account, verifyCode, password)
    if(error && error.message) return Alert.alert(I18n.t('error'), error.message)
    this.props.navigation.goBack()
  }

  rightButton = (isValid) => {
    if(isValid) return <Button title={I18n.t('done')} onPress={this.onDonePress} />
    return null
  }

  validate = () => {
		const isValid = _.every({
      verifyCode: (value) => (validator.isLength(value, { min: 1 })),
      password: (value) => (validator.isLength(value, { min: 6 })),
      confirmPassword: (value) => (value.length === this.state.password.length),
    }, (validate, key) => {
			const value = this.state[key];
			return value && validate(value);
		});
    const button = (this.props.navigation.getParam('rightButton')) ? true : false
    if(button != isValid) this.props.navigation.setParams({rightButton: this.rightButton(isValid)})
  }

  codeProps = () => ({
    value: this.state.verifyCode,
    onChangeText: verifyCode => this.setState({verifyCode}, this.validate),
    title: I18n.t('code'),
    secureTextEntry:true,
  })

  basePasswordProps = () => ({
    placeholder: I18n.t('atLeast6Digits'),
    placeholderTextColor:'rgba(255,255,255, 0.3)',
    secureTextEntry:true,
  })

  passwordProps = () => ({
    value: this.state.password,
    onChangeText: password => this.setState({password}, this.validate),
    title: I18n.t('password'),
    ...this.basePasswordProps(),
  })

  confirmProps = () => ({
    value: this.state.confirmPassword,
    onChangeText: confirmPassword => this.setState({confirmPassword}, this.validate),
    title: I18n.t('again'),
    ...this.basePasswordProps(),
  })

  render () {
    return (
      <View style={styles.container}>
        <TitleInput {...this.codeProps()}/>
        <TitleInput {...this.passwordProps()}/>
        <TitleInput {...this.confirmProps()}/>
      </View>
    )
  }
}

export default ForgetPasswordScreen
