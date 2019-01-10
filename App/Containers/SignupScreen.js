import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/SingupScreenStyle'
import I18n from "../I18n";

import SocailMediaButtons from "../Components/SocailMediaButtons"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput";
import {HeaderBackButton} from "react-navigation"

class SignupScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: I18n.t('signUp'),
    headerTransparent:true,
    headerTintColor:'white',
    // headerLeft: (<View style={{marginLeft:30}}><HeaderBackButton tintColor='white' onPress={() => navigation.goBack() } /></View>)
  })

  state = {
    email:null,
    password: null
  }

  onFb = () => {}
  onTwitter = () => {}
  onGoogle= () => {}
  onWechat = () => {}
  emailInputProps = () => ({
    value:this.state.email,
    onChangeText:email => this.setState({email}),
    placeholder:I18n.t('emailAddress'),
    placeholderTextColor:'grey'
  })

  passwordInputProps = () => ({
    secureTextEntry:true,
    value:this.state.password,
    onChangeText:password => this.setState({password}),
    placeholder:I18n.t('password'),
    placeholderTextColor:'grey'
  })

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
            <Text style={styles.text}>{I18n.t('quickRegisteration')}</Text>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>{I18n.t('orSignUpWithEmail')}</Text>
          <RoundedTextInput {...this.emailInputProps()}/>
          <RoundedTextInput {...this.passwordInputProps()}/>
          <RoundedButton onPress={() => console.tron.log(this.state.email, this.state.password)}/>
        </View>
      </View>
    )
  }
}


export default SignupScreen