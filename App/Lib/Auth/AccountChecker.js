
import { getUser } from '../../../src/graphql/queries'
import { GoogleSignin } from 'react-native-google-signin'
import { 
    LoginManager, 
    GraphRequest, 
    GraphRequestManager, 
    AccessToken
} from 'react-native-fbsdk'

class AccountChecker{

    addEmail = (client, {email}, {avatarPath, nickname, subType}) => new Promise(resolve => {
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

    _fbGetInfoCallBack = (error, result, resolve, client) => {
        LoginManager.logOut()
        
        if(error) return resolve({
            error: error.toString()
        })

        const {email, name, picture, id} = result

        if(!result.email) return resolve({
            params: {
                nickname: name,
                avatarPath: picture.data.url,
                id,
                subType:'fb'
            }
        })

        
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
                    nickname: name,
                    avatarPath: picture.data.url,
                    id,
                    type:'fb'
                },
            })
        })
        .catch(err => {
            // console.tron.log(err)
            resolve({
                error:{message: err.toString()}
            })
        })
    }

    fb = client => new Promise(resolve => {
        LoginManager.logOut()
        LoginManager.logInWithReadPermissions(["public_profile", "email"])
            .then(result => {
                if(result.isCancelled) {
                    LoginManager.logOut()
                    return resolve({
                        error:'canceled',
                    })
                }
                
                const infoRequest = new GraphRequest(
                    '/me?fields=name,picture,email',
                    null,
                    (err, ret) => this._fbGetInfoCallBack(err, ret, resolve, client),
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

    withoutEmail = client => new Promise(resolve => {
        resolve({
            params:{
                nickname: 'no email',
                id:'999827',
                subType:'fb'
            }
        })
    })
}

const instance = new AccountChecker()
export default instance