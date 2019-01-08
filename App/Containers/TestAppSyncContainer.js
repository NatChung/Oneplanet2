import React, { Component } from 'react'
import { ScrollView, TextInput, Text } from 'react-native'
import RoundedButton from "../Components/RoundedButton"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      nickname
    }
  }
`

const createUser = gql`
  mutation CreateUser($id: ID!,  $nickname: String!) {
    createUser(input: {id:$id, nickname:$nickname}) {
      id
      nickname
    }
}
`

// Styles
import styles from './Styles/TestAppSyncContainerStyle'

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

  mutationPress = (createUser, props) => {
    // console.tron.log(props)
    const {email, nickname} = this.state
    if(!email || !nickname) return

    
    createUser({variables: {id:email.toLowerCase(), nickname:nickname}})
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <TextInput style={styles.input} onChangeText = {text => this.setState({email:text})} keyboardType='email-address' />
        <TextInput value={this.state.nickname} style={styles.input} onChangeText = {text => this.setState({nickname:text})}/>

        <Mutation mutation={createUser} onCompleted={data => console.tron.log(data)} onError={error => console.tron.log(error)}>
          { (createUser, props) => <RoundedButton text="Mutation" onPress={() => this.mutationPress(createUser, props)} /> }
        </Mutation>

        <Query query={getUser} variables={{id:'nat.chung@mores.com.tw'}}>
          {props => (<Text style={styles.error}>{`Query(${props.data.getUser.id}): `+props.data.getUser.nickname}</Text>)}
        </Query>
        
      </ScrollView>
    )
  }
}

export default TestAppSyncContainer
