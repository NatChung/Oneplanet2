
import { getUser, getTwitterExtEmail, getFbExtEmail } from '../../../src/graphql/queries'
import { GoogleSignin } from 'react-native-google-signin'
import { RNTwitterSignIn } from 'react-native-twitter-signin'
import { 
    LoginManager, 
    GraphRequest, 
    GraphRequestManager
} from 'react-native-fbsdk'

class AccountChecker{

    twitterWithEmail = ({email, userName}, resolve, client) => {
        client.query({
            query: getUser,
            variables: {id: email}, 
            fetchPolicy:'network-only'
        })
        .then(({data}) => {
            if(data.getUser) resolve({error: {message:'theEamilOfTwitterAlredyInUsed'}})
            else resolve({
                params:{
                    email,
                    nickname:userName,
                    type:'twitter'
                },
            })
        })
        .catch(err => {
            resolve({error:{message: err.toString()}})
        })
    }

    twitterWithoutEmail = ({userID, userName}, resolve, client) => {
        client.query({
            query: getTwitterExtEmail,
            variables: {id: userID}, 
            fetchPolicy:'network-only'
        })
        .then(({data}) => {
            console.tron.log('withoutEmail', data)
            if(data.getTwitterExtEmail) resolve({ error:{message:'theTwitterAlredyRegistered'}})
            else resolve({
                params:{
                    nickname: userName,
                    id:userID,
                    subType:'twitter',
                    type:'addEmail'
                }
            })
        })
        .catch(err => {
            resolve({error:{message: err.toString()}})
        })
    }

    addEmail = (client, {email}, {avatarPath, nickname, subType, id}) => new Promise(resolve => {
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
                    avatarPath,
                    nickname,
                    subType,
                    id,
                    type:'addEmail'
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

    fbWithEmail = ({email, name, picture}, resolve, client) => {
        client.query({
            query: getUser,
            variables: {id: email}, 
            fetchPolicy:'network-only'
        })
        .then(({data}) => {
            if (data.getUser) resolve({error:{message:'theFbAlredyRegistered'} })
            else resolve({
                params:{
                    email,
                    avatarPath: picture.data.url,
                    nickname:name,
                    type:'fb'
                },
            })
        })
        .catch(err => {
            resolve({error:{message: err.toString()}})
        })
    }

    fbWithoutEmail = ({ name, picture, id}, resolve, client) => {
        client.query({
            query: getFbExtEmail,
            variables: {id}, 
            fetchPolicy:'network-only'
        })
        .then(({data}) => {
            if(data.getFbExtEmail) resolve({ error:{message:'theFbAlredyRegistered'}}) 
            else resolve({
                params:{
                    nickname: name,
                    avatarPath: picture.data.url,
                    id,
                    subType:'fb',
                    type:'addEmail'
                }
            })
        })
        .catch(err => {
            // console.tron.log(err)
            resolve({error:{message: err.toString()}})
        })
    }

    

    twitter = client => new Promise(resolve => {
        RNTwitterSignIn.logOut()
        RNTwitterSignIn.logIn()
            .then(loginData => {
                console.tron.log('loginData', loginData)
                if(loginData.email) this.twitterWithEmail(loginData, resolve, client)
                else this.twitterWithoutEmail(loginData, resolve, client)
            })
            .catch(err => {
                console.tron.log('twitterError', err)
                resolve({error:err.toString()})
            })
    })

    fbGetInfoCallBack = (error, result, resolve, client) => {
        LoginManager.logOut()
        if(error) return resolve({error: error.toString()})
        if(result.email) this.fbWithEmail(result, resolve, client)
        else this.fbWithoutEmail(result, resolve, client)
    }

    fb = client => new Promise(resolve => {
        LoginManager.logOut()
        LoginManager.logInWithReadPermissions(["public_profile", "email"])
            .then(result => {
                if(result.isCancelled) {
                    LoginManager.logOut()
                    return resolve({error:'canceled'})
                }
                
                const infoRequest = new GraphRequest(
                    '/me?fields=name,picture,email',
                    null,
                    (err, ret) => this.fbGetInfoCallBack(err, ret, resolve, client),
                )

                new GraphRequestManager().addRequest(infoRequest).start()
            })
            .catch(error => {
                LoginManager.logOut()
                resolve({
                    error:{message: error.toString()}
                })
            })

    })

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
                    error:err.toString()
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

const instance = new AccountChecker()
export default instance