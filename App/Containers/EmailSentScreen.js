import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { Images } from "../Themes"
import RoundedButton from "../Components/RoundedButton"
import I18n from "../I18n"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EmailSentScreenStyle'

class EmailSentScreen extends Component {

  okButtonProps = () => ({
    style:styles.okButton,
    text:I18n.t('ok'),
    onPress:() => this.props.navigation.navigate('LandingScreen')
  })

  emilSentInfo = () => I18n.t('theEmailHasBeenSentPleaseClickTheLinkInTheEmailToCompleteTheRegistrationProcess')

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.loginBackground} style={styles.backgroundImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{this.emilSentInfo()}</Text>
          <RoundedButton {...this.okButtonProps()}/>
        </View>
      </View>
    )
  }
}

export default EmailSentScreen
