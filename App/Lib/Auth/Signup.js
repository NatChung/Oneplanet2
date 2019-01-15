

import { getUser } from "../../Graphql/Query"
import { GoogleSignin } from 'react-native-google-signin'

class Signup{

    google = client => new Promise(resolve => {
        let googleUser = null
        GoogleSignin.hasPlayServices()
            .then(service => {
                if(service) return GoogleSignin.signIn()
                resolve({error:'googleServicesNotSupported'})
            })
            .then(userInfo => {
                googleUser = userInfo.user
                const {email} = userInfo.user
                return client.query({
                    query: getUser,
                    variables: {id: email}, 
                    fetchPolicy:'network-only'
                })
            })
            .then(({data}) => {
                // console.tron.log(data)
                const {email, name, photo} = googleUser
                resolve({
                    error:(data && data.getUser) ? {message:'theEmailAlredyInUsed'} : null,
                    params:{
                        email,
                        avatarPath: photo,
                        nickname:name,
                        type:'google'
                    },
                })
                GoogleSignin.revokeAccess()
                GoogleSignin.signOut()
            })
            .catch(err => {
                // console.tron.log('got error = ',error)
                resolve({
                    error:{message: err.toString()}
                })
            })

    })

    email = (client, {email, password}) => new Promise(resolve => {
        client.query({
            query: getUser,
            variables: {id: email},
            fetchPolicy:'network-only'
        })
        .then(({data}) => {
            // console.tron.log(data)
            resolve({
                error:(data && data.getUser) ? {message:'theEmailAlredyInUsed'} : null,
                params:{
                    email,
                    password,
                    type:'email'
                },
            })
        })
        .catch(err => {
            // console.tron.log(err)
            resolve({
                error:{message: err.toString()}
            })
        })
    })
}

const instance = new Signup()
export default instance