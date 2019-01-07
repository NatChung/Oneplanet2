import React, { Component } from 'react'
import { ScrollView, TextInput, Text } from 'react-native'
import { Auth } from 'aws-amplify'
import RoundedButton from "../Components/RoundedButton"

// Styles
import styles from './Styles/TestCognitoContainerStyle'

class TestCognitoContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      status:null,
      email: null,
      password: null
    }
    this.checkUser()
  }

  checkUser = async () => {
    await Auth.currentAuthenticatedUser()
      .then((user) => this.setState({status: user.username}))
      .catch((error) => this.setState({status: error}));
  }

  emailSignOut = async () => {
    await Auth.signOut()
    .then(data => this.setState({status: 'Email SignOut success'}))
    .catch(err => this.setState({status: error.toString()}));
  }

  emailSignUp = async () => {
    const { password, email } = this.state
    
    await Auth.signUp({
      username:email,
      password,
      attributes: {email},
    })
      .then((data) => this.setState({status: 'Email Signup success'}))
      .catch((error) => this.setState({status: error.message}))
  }

  emailSignIn = async () => {
    const { email, password } = this.state
    await Auth.signIn(email, password)
      .then((user) => this.setState({status: 'Email SignIn success'}))
      .catch((error) => this.setState({status: error.message}))
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.status}>{this.state.status}</Text>
        <TextInput style={styles.input} onChangeText = {text => this.setState({email:text})} keyboardType='email-address' />
        <TextInput style={styles.input} onChangeText = {text => this.setState({password:text})}/>
        <RoundedButton text="Email SignUp" onPress={this.emailSignUp} />
        <RoundedButton text="Email SignIn" onPress={this.emailSignIn} />
        <RoundedButton text="Email SignOut" onPress={this.emailSignOut} />
        <RoundedButton text='Refresh' onPress={this.checkUser} />
      </ScrollView>
    )
  }
}


export default TestCognitoContainer
