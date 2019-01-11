import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity} from 'react-native'
import { Images } from "../Themes"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput"
import I18n from "../I18n"
// Styles
import styles from './Styles/AddProfileScreenStyle'

class AddProfileScreen extends Component {

  state = {
    nickname:null,
    nicknameError: null
  }

  nicknameInputProps = () => ({
    placeholderTextColor:'grey',
    placeholder:I18n.t('nickname'),
    value: this.state.nickname,
    onChangeText: nickname => this.setState({nickname}),
    error: this.state.nicknameError
  })

  nextButtonProps = () => ({
    style:styles.nextButton,
    text:I18n.t('next'),
    onPress:() => this.props.navigation.navigate('EmailSentScreen')
  })


  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.loginBackground} style={styles.backgroundImage} />
        <RoundedTextInput {...this.nicknameInputProps()} />
        <Text style={styles.text}>{I18n.t('welcomeToOneplanet')}</Text>
        <TouchableOpacity style={styles.imageButton}>
          <Image style={styles.avatar} source={Images.addProfile.avatar} />
        </TouchableOpacity>
        <RoundedButton outline={true} text={I18n.t('addProfilePhoto')}/>
        <Text style={styles.text}>{I18n.t('addAProfilePhotoSoYourFriendsKnowItsYou')}</Text>
        <RoundedButton {...this.nextButtonProps()}/>
        
      </View>
    )
  }
}


export default AddProfileScreen
