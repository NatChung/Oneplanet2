import React, { Component } from 'react'
import { View, Text} from 'react-native'
import I18n from "../I18n"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput"
import { ApolloConsumer } from 'react-apollo'
import validator from 'validator'
import _ from 'lodash'
import {Signup} from '../Lib/Auth'
// Styles
import styles from './Styles/AddEmailScreenStyle'

class AddEmailScreen extends Component {

  static navigationOptions = {
    title: I18n.t('emailAddress'),
    headerTintColor:'white',
    headerStyle: {
      backgroundColor: '#191919',
    }
  }

  state = {
    email: null,
    emailError:null,
    signupDisabled: true
  }

	validate = () => {
		const isValid = _.every({
      email: (value) => validator.isEmail(value)
    }, (validate, key) => {
			const value = this.state[key];
			return value && validate(value);
		});
		this.setState({ signupDisabled: !isValid });
  }

  onSignup = client => async () => {
    const result = await Signup.addEmail(client, this.state, this.props.navigation.state.params)
    if(!result.error) this.props.navigation.navigate('AddProfileScreen', result.params)
    else if(result.error.message) this.setState({emailError: I18n.t(result.error.message)})
  }

  onEmailChangeText = value => {
    this.setState({email:value.toLowerCase()}, this.validate)
    if(this.state.emailError) this.onCheckEamil()
  }

  onCheckEamil = () => {
    if(!this.state.email) return
    const emailError = validator.isEmail(this.state.email) ? null : I18n.t('incorrectEmail')
    this.setState({emailError })
  }

  signupButtonProps = client => ({
    text:I18n.t('signUp'),
    onPress:this.onSignup(client),
    style: styles.signupButton,
    disabled: this.state.signupDisabled
  })

  emailInputProps = () => ({
    value:this.state.email,
    onChangeText:this.onEmailChangeText,
    placeholder:I18n.t('emailAddress'),
    placeholderTextColor:'grey',
    error: this.state.emailError,
    onBlur: this.onCheckEamil
  })
  
  
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{I18n.t('addEmailInfo')}</Text>
        <RoundedTextInput {...this.emailInputProps()} />
        <ApolloConsumer>
          {client => <RoundedButton {...this.signupButtonProps(client)}/>}
        </ApolloConsumer>
      </View>
    )
  }
}

export default AddEmailScreen
