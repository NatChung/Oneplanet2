import React, { Component } from 'react'
import { ScrollView, TextInput, Text, Image } from 'react-native'
import RoundedButton from "../Components/RoundedButton"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Auth } from "aws-amplify"
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { v4 as uuid } from "uuid"
import AwsConfig from '../aws-exports'
import RNFetchBlob from 'rn-fetch-blob'

// Styles
import styles from './Styles/TestAppSyncContainerStyle'

const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      nickname
    }
  }
`

const createUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      nickname,
      avatar {
        key
      }
    }
}
`

const IMAGEPATH = 'file:///Users/nat/Desktop/test.jpg'


class TestAppSyncContainer extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      error:null,
      email: null,
      nickname: null
    }
  }

  componentWillReceiveProps(newProps){
    if(this.state.nickname != newProps.nickname){
      this.setState({nickname: newProps.nickname})
    }
  }

  mutationPress = async (createUser, props) => {
    // console.tron.log(props)
    const {email, nickname} = this.state
    if(!email || !nickname) return

    const fileName = uuid()+'.jpg'
    const visibility = 'public'
    const { identityId } = await Auth.currentCredentials();
    const data = await RNFetchBlob.fs.readFile('/Users/nat/Desktop/test.jpg','base64')
    const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(fileName)
    const key = `${visibility}/${identityId}/${uuid()}${extension && '.'}${extension}`;
    
    // createUser({variables: {id:email.toLowerCase(), nickname:nickname}})
    createUser({variables: {
      input: {
        id: email.toLowerCase(),
        nickname,
        avatar: {
          bucket:AwsConfig.aws_user_files_s3_bucket,
          key,
          region:AwsConfig.aws_user_files_s3_bucket_region,
          mimeType:'image/jpg',
          localUri: new Buffer(data, 'base64')
        }
      }
    }})
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <TextInput style={styles.input} onChangeText = {text => this.setState({email:text})} keyboardType='email-address' />
        <TextInput value={this.state.nickname} style={styles.input} onChangeText = {text => this.setState({nickname:text})}/>
        <Image style={styles.uploadImage} source={{uri:IMAGEPATH}}/>

        <Mutation mutation={createUser} onCompleted={data => console.tron.log(data)} onError={error => console.tron.log(error)}>
          { (createUser, props) => <RoundedButton text="Mutation" onPress={() => this.mutationPress(createUser, props)} /> }
        </Mutation>

        <Query query={getUser} variables={{id:'nat.chung@mores.com.tw'}}>
          {props => (<Text style={styles.error}>{`Query: `+ JSON.stringify(props.data)}</Text>)}
        </Query>
        
      </ScrollView>
    )
  }
}

export default TestAppSyncContainer
