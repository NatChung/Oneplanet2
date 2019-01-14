import React, { Component } from 'react'
import { View, Image, Text, Alert} from 'react-native'
import { Images } from '../Themes'
import I18n from "../I18n"
import validator from 'validator'
import _ from 'lodash'
import SocailMediaButtons from "../Components/SocailMediaButtons"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput"
import { GoogleSignin } from 'react-native-google-signin'
import to from 'await-to-js'
import { ApolloConsumer } from 'react-apollo'
import { getUser } from "../Graphql/Query";
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

  googleSignup = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }

  onFb = () => {}
  onTwitter = () => {}

  onWechat = () => {
    this.googleSignup()
  }

  onGoogle =  client => async () => {

    const service = await GoogleSignin.hasPlayServices()
    if(!service) return Alert.alert(I18n.t('Error'), I18n.t('googleSigninNotSupported'), [ { text: I18n.t('ok') } ]) 

    const [signinError, userInfo] = await to(GoogleSignin.signIn())
    if(signinError) return console.tron.log(signinError)
    
    const {email, name, photo} = userInfo.user
    const {data} = await client.query({query: getUser,variables: {id: email}, fetchPolicy:'network-only'})
    
    if(data && data.getUser) {
      this.googleSignup()
      return Alert.alert(I18n.t('Error'), I18n.t('theEmailAlredyInUsed'), [ { text: I18n.t('ok') } ])
    } 

    this.props.navigation.navigate('AddProfileScreen', {email, nickname:name, avatarPath:photo, type:'google'})
  }
  
  onSignup = client => async () => {
    const {email, password} = this.state
    const {data} = await client.query({query: getUser,variables: {id: email}, fetchPolicy:'network-only'})
    if(data && data.getUser) return this.setState({emailError: I18n.t('theEmailAlredyInUsed')})
    this.props.navigation.navigate('AddProfileScreen', {email, password, type:'email'})
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
    onChangeText:this.onEmailChangeText,
    placeholder:I18n.t('emailAddress'),
    placeholderTextColor:'grey',
    error: this.state.emailError,
    onBlur: this.onCheckEamil
  })

  passwordInputProps = () => ({
    secureTextEntry:true,
    value:this.state.password,
    onChangeText:this.onPasswordChangeText,
    placeholder:I18n.t('password'),
    placeholderTextColor:'grey',
    error: this.state.passwordError,
    onBlur: this.onCheckPassowrd
  })

  signupButtonProps = client => ({
    text:I18n.t('signUp'),
    onPress:this.onSignup(client),
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

  onPasswordChangeText = password => {
    this.setState({password}, this.validate)
    if(this.state.passwordError)  this.onCheckPassowrd()
  }

  onEmailChangeText = value => {
    this.setState({email:value.toLowerCase()}, this.validate)
    if(this.state.emailError) this.onCheckEamil()
  }
  
  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.loginBackground} style={styles.backgroundImage} />
        <View style={styles.socailMediaContainer}>
          <ApolloConsumer>
            {client => (<SocailMediaButtons 
              onWechat={this.onWechat}
              onTwitter={this.onTwitter}
              onGoogle={this.onGoogle(client)}
              onFb={this.onFb} />)}
            </ApolloConsumer>
            <Text style={styles.quickTitle}>{I18n.t('quickRegisteration')}</Text>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>{I18n.t('orSignUpWithEmail')}</Text>
          <RoundedTextInput {...this.emailInputProps()}/>
          <RoundedTextInput {...this.passwordInputProps()}/>
          <ApolloConsumer>
            {client => <RoundedButton {...this.signupButtonProps(client)} />}
          </ApolloConsumer>
        </View>
      </View>
    )
  }
}


export default SignupScreen
