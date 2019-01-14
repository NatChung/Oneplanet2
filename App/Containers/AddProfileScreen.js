import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity} from 'react-native'
import { Images } from "../Themes"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput"
import I18n from "../I18n"
import ImagePicker from 'react-native-image-crop-picker'
import to from 'await-to-js'
import validator from 'validator'
import _ from 'lodash'
// Styles
import styles from './Styles/AddProfileScreenStyle'

class AddProfileScreen extends Component {

  state = {
    nickname:null,
    nicknameError: null,
    avatarPath: null,
    nextDisabled: true
  }

  nicknameInputProps = () => ({
    placeholderTextColor:'grey',
    placeholder:I18n.t('nickname'),
    value: this.state.nickname,
    onChangeText: this.handleInputChange,
    error: this.state.nicknameError
  })

  handleInputChange = (value) => {
    this.setState({ 
      nickname: validator.trim(value),
      nicknameError: validator.isLength(value, { max: 14 }) ? null: I18n.t('incorrectNickanme')
    }, this.validate)
	}

  nextButtonProps = () => ({
    style:styles.nextButton,
    text:I18n.t('next'),
    onPress:() => this.props.navigation.navigate('EmailSentScreen'),
    disabled: this.state.nextDisabled
  })

  avatarProps = () => ({
    style: (this.state.avatarPath) ? [styles.avatar, styles.avatarOutline] : styles.avatar,
    source: (this.state.avatarPath) ? {uri: this.state.avatarPath} : Images.addProfile.avatar,
  })

  addPhotoProps = () => ({
    outline: true,
    text: (this.state.avatarPath) ? I18n.t('changeProfilePhoto') : I18n.t('addProfilePhoto'),
    onPress:this.onAvatarPress
  })

  onAvatarPress = async () => {
    [error, image] = await to(ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.2
    }))

    if(!error) this.setState({avatarPath: image.path}, this.validate)
  }

  validations = {
    avatarPath: value => true,
		nickname: (value) => (validator.isLength(value, { max: 14 }))
	}

  validate = () => {
		const isValid = _.every(this.validations, (validate, key) => {
			const value = this.state[key];
			return value && validate(value);
    });
		this.setState({ nextDisabled: !isValid });
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.loginBackground} style={styles.backgroundImage} />
        <RoundedTextInput {...this.nicknameInputProps()} />
        <Text style={styles.text}>{I18n.t('welcomeToOneplanet')}</Text>
        <Image {...this.avatarProps()} />
        <RoundedButton {...this.addPhotoProps()}/>
        <Text style={styles.text}>{I18n.t('addAProfilePhotoSoYourFriendsKnowItsYou')}</Text>
        <RoundedButton {...this.nextButtonProps()}/>
      </View>
    )
  }
}


export default AddProfileScreen
