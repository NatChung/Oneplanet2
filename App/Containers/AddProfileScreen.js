import React, { Component } from 'react'
import { Text, View, Image, Alert, ActivityIndicator} from 'react-native'
import { Images } from "../Themes"
import RoundedButton from "../Components/RoundedButton"
import RoundedTextInput from "../Components/RoundedTextInput"
import I18n from "../I18n"
import ImagePicker from 'react-native-image-crop-picker'
import to from 'await-to-js'
import validator from 'validator'
import _ from 'lodash'
import { createUser, createFbExtEmail, createWechatExtEmail, createTwitterExtEmail } from "../../src/graphql/mutations"
import { Mutation } from 'react-apollo'
import { Auth } from 'aws-amplify'
import { v4 as uuid } from "uuid"
import AwsConfig from '../aws-exports'
import RNFetchBlob from 'rn-fetch-blob'
import { Adopt } from "react-adopt";
// Styles
import styles from './Styles/AddProfileScreenStyle'

const mapper = {
  user: ({ render }) => (
    <Mutation mutation={createUser}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  fbExtEmail: ({render}) => (
    <Mutation mutation={createFbExtEmail}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  wechatExtEmail: ({render}) => (
    <Mutation mutation={createWechatExtEmail}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  twitterExtEmail: ({render}) => (
    <Mutation mutation={createTwitterExtEmail}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
}

const mapProps = ({ user, fbExtEmail, wechatExtEmail, twitterExtEmail}) => ({
  createUser: user.mutation,
  userResult: user.result,
  createFbExtEmail: fbExtEmail.mutation,
  fbExtEmailResult: fbExtEmail.result,
  createWechatExtEmail: wechatExtEmail.mutation,
  wechatExtEmailResult: wechatExtEmail.result,
  createTwitterExtEmail: twitterExtEmail.mutation,
  twitterExtEmailResult: twitterExtEmail.result,
})

class AddProfileScreen extends Component {

  state = {
    nickname:null,
    nicknameError: null,
    avatarPath: null,
    nextDisabled: true,
    loading: false,
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

  addEmailSignUp = async (imageBuffer, createUser, extEmail) => {

    const {email, id} = this.props.navigation.state.params
    const password = uuid()
    const [error, _] = await to(extEmail({
      variables: {
        input: {
          id,
          email,
          sub: password
        }
      }
    }))

    if(error) return console.tron.log('error', error)

    const [authError, __] = await to(Auth.signUp({
      username: email,
      password,
      attributes: {email},
    }))

    if(!authError) this.addUserPorfile(imageBuffer, createUser )
    else {
      this.setState({loading:false})
      Alert.alert(authError.name, authError.message, [ { text: I18n.t('ok'), onPress: this.backToLandingScreen } ])
    }
  }
  
  emailSignUp = async (imageBuffer, createUser) => {
    const {email, password} = this.props.navigation.state.params
    const [authError, _] = await to(Auth.signUp({
      username: email,
      password,
      attributes: {email},
    }))

    if(!authError) this.addUserPorfile(imageBuffer, createUser )
    else {
      this.setState({loading:false})
      Alert.alert(authError.name, authError.message, [ { text: I18n.t('ok'), onPress: this.backToLandingScreen } ])
    }
  }

  socialMediaSignUp = (imageBuffer, createUser) => {
    this.addUserPorfile(imageBuffer, createUser )
  }

  getExtEmailType(subType, {createFbExtEmail, createWechatExtEmail, createTwitterExtEmail}){
    switch (subType) {
      case 'fb': return createFbExtEmail
      case 'wechat': return createWechatExtEmail
      case 'twitter': return createTwitterExtEmail
      default: return createFbExtEmail
    }
  }

  onNextPress = props => async () => {

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

    this.setState({loading:true})
    const {createUser} = props
    const {type, subType} = this.props.navigation.state.params
    switch(type){
      case 'twitter':
      case 'fb':
      case 'google': return this.socialMediaSignUp(imageBuffer, createUser)
      case 'addEmail': return this.addEmailSignUp(imageBuffer, createUser, this.getExtEmailType(subType, props))
      case 'email': return this.emailSignUp(imageBuffer, createUser)
      default: console.tron.log('Signup type error')
    }
  }

  backToLandingScreen = () => this.props.navigation.navigate('LandingScreen')

  addUserPorfile = async (imageBuffer, createUser) => {

    const {nickname} = this.state
    const {type, email} = this.props.navigation.state.params

    const {identityId} = await Auth.currentCredentials()
    const key = `public/${identityId}/${uuid()}.jpg`;
    const [err, ret]  = await to(createUser({variables: {
      input: {
        id:email,
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
    

    if(err) Alert.alert(I18n.t('error'), I18n.t('createUserProfileFailed'), [ { text: I18n.t('ok') } ])
    else if(type === 'addEmail' || type === 'email') this.props.navigation.navigate('EmailSentScreen')
    else this.props.navigation.navigate('LandingScreen')
  }

  onAvatarPress = async () => {
    const [error, image] = await to(ImagePicker.openPicker({
      width: 500,
      height: 500,
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

  nextButtonProps = (props) => ({
    style:styles.nextButton,
    text:I18n.t('next'),
    onPress: this.onNextPress(props),
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
        
        <Adopt mapper={mapper} mapProps={mapProps}>
          {(props) => <RoundedButton {...this.nextButtonProps(props)}/>}
        </Adopt>
        {(this.state.loading) ? <ActivityIndicator style={styles.loading} size="large" color="white" />:null}
      </View>
    )
  }
}


export default AddProfileScreen
