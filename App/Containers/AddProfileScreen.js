import React, { Component } from 'react'
import { Text, View, Image, Alert} from 'react-native'
import { Images } from "../Themes"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput"
import I18n from "../I18n"
import ImagePicker from 'react-native-image-crop-picker'
import to from 'await-to-js'
import validator from 'validator'
import _ from 'lodash'
import { createUser } from "../Graphql/Mutation"
import { Mutation } from 'react-apollo'
import { Auth } from 'aws-amplify'
import { v4 as uuid } from "uuid"
import AwsConfig from '../aws-exports'
import RNFetchBlob from 'rn-fetch-blob'
// Styles
import styles from './Styles/AddProfileScreenStyle'

class AddProfileScreen extends Component {

  state = {
    nickname:null,
    nicknameError: null,
    avatarPath: null,
    nextDisabled: true
  }

  componentDidMount = async () => {
    const {nickname, avatarPath} = this.props.navigation.state.params
    this.setState({nickname, avatarPath}, this.validate)
  }


  handleInputChange = (value) => {
    this.setState({ 
      nickname: validator.trim(value),
      nicknameError: validator.isLength(value, { max: 14 }) ? null: I18n.t('incorrectNickanme')
    }, this.validate)
  }
  
  emailSignUp = async (imageBuffer, createUser) => {
    const {email, password} = this.props.navigation.state.params
    const [authError, _] = await to(Auth.signUp({
      username: email,
      password,
      attributes: {email},
    }))

    if(!authError) this.addUserPorfile(username, this.state.nickname, imageBuffer, createUser )
    else Alert.alert(authError.name, authError.message, [ { text: I18n.t('ok'), onPress: this.backToLandingScreen } ])
  }

  googleSignUp = async (imageBuffer, createUser) => {
    const {email} = this.props.navigation.state.params
    this.addUserPorfile(email, this.state.nickname, imageBuffer, createUser )
  }

  onNextPress = async (createUser) => {

    let imageBuffer = null
    const isFile = (!/^(f|ht)tps?:\/\//i.test(this.state.avatarPath))

    if(isFile){
      const [dataError, imageData] = await to(RNFetchBlob.fs.readFile(this.state.avatarPath,'base64'))
      if(dataError) return Alert.alert(I18n.t('error'), I18n.t('readSelectedImageError'), [ { text: I18n.t('ok') } ])
      imageBuffer = new Buffer(imageData, 'base64')
    }else {
      const [dataError, imageData] = await to(RNFetchBlob.fetch('GET', this.state.avatarPath))
      if(dataError) return Alert.alert(I18n.t('error'), I18n.t('readSelectedImageError'), [ { text: I18n.t('ok') } ])
      imageBuffer = new Buffer(imageData.data, 'base64')
    }
    
    const type = this.props.navigation.getParam('type')
    switch(type){
      case 'google': return this.googleSignUp(imageBuffer, createUser)
      case 'email': return this.emailSignUp(imageBuffer, createUser)
      default: this.onCreateUserError()
    }
  }

  backToLandingScreen = () => this.props.navigation.navigate('LandingScreen')

  addUserPorfile = async (id, nickname, imageBuffer, createUser) => {
  
    const {identityId} = await Auth.currentCredentials()
    const key = `public/${identityId}/${uuid()}.jpg`;
    const [err, ret]  = await to(createUser({variables: {
      input: {
        id,
        nickname,
        avatar: {
          bucket:AwsConfig.aws_user_files_s3_bucket,
          key,
          region:AwsConfig.aws_user_files_s3_bucket_region,
          mimeType:'image/jpg',
          localUri: imageBuffer
        }
      }
    }}))

    if(err) {
      Alert.alert(I18n.t('error'), I18n.t('createUserProfileFailed'), [ { text: I18n.t('ok') } ])
      console.tron.log(err)
    }
  }

  onAvatarPress = async () => {
    const [error, image] = await to(ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.1
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

  onCreateUserCompleted = data => {
    const {type} = this.props.navigation.state.params
    if(type === 'email') this.props.navigation.navigate('EmailSentScreen')
    else this.props.navigation.navigate('LandingScreen')
  }

  onCreateUserError = error => {
    console.tron.log(error)
    Alert.alert(error.name, I18n.t('signUpFailed'), [ { text: I18n.t('ok'), onPress: this.backToLandingScreen } ])
  }

  nextButtonProps = (createUser) => ({
    style:styles.nextButton,
    text:I18n.t('next'),
    onPress: () => this.onNextPress(createUser),
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

  mutationProps = () => ({
    mutation:createUser,
    onCompleted:this.onCreateUserCompleted,
    onError:this.onCreateUserError,
  })

  nicknameInputProps = () => ({
    placeholderTextColor:'grey',
    placeholder:I18n.t('nickname'),
    value: this.state.nickname,
    onChangeText: this.handleInputChange,
    error: this.state.nicknameError
  })
  
  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.loginBackground} style={styles.backgroundImage} />
        <RoundedTextInput {...this.nicknameInputProps()} />
        <Text style={styles.text}>{I18n.t('welcomeToOneplanet')}</Text>
        <Image {...this.avatarProps()} />
        <RoundedButton {...this.addPhotoProps()}/>
        <Text style={styles.text}>{I18n.t('addAProfilePhotoSoYourFriendsKnowItsYou')}</Text>
        
        <Mutation {...this.mutationProps()}>
          {(createUser) => <RoundedButton {...this.nextButtonProps(createUser)}/>}
        </Mutation>
      </View>
    )
  }
}


export default AddProfileScreen
