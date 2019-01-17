import { getUser, getTwitterExtEmail, getFbExtEmail } from '../../../src/graphql/queries'
import { GoogleSignin } from 'react-native-google-signin'
import { RNTwitterSignIn } from 'react-native-twitter-signin'
import { Auth } from 'aws-amplify'
import to from 'await-to-js'
import { 
    LoginManager, 
    GraphRequest, 
    GraphRequestManager
} from 'react-native-fbsdk'

class Signin{

    getProfile = async (client, email, resolve) => {
        const [profileError, profile] = await to(client.query({
            query:getUser,
            variables: {id: email}, 
            fetchPolicy:'network-only'
        }))
        if(profileError) return resolve({error:profileError})
        else return resolve({profile})
    }

    getPorfileThroughCognitoAuth = async (client, {email, sub}, resolve) => {
        const [authError, auth] = await to(Auth.signIn(email, sub))
        if(authError) return resolve({error: authError})
        return this.getProfile(client, email, resolve)
    }

    getExtEmail = ( client, id, extEmail) => client.query({
        query: extEmail,
        variables: {id}, 
        fetchPolicy:'network-only'
    })

    getAccountType = (client, account) => new Promise(async(resolve) => {
        const [error, {data}] = await to(client.query({
            query:getUser,
            variables: {id: account}, 
            fetchPolicy:'network-only'
        }))
        if(error) return resolve({error})
        console.tron.log(data.getUser)
        resolve({type: data.getUser.type})
    })
    
    fbGetInfoCallBack = async (error, {email, id}, resolve, client) => {
        if(error) {
            LoginManager.logOut()
            return resolve({error})
        }

        if(email) return this.getProfile(client, email, resolve)
        
        const [emailError, {data}] = await to(this.getExtEmail(client, id, getFbExtEmail))
        if(emailError) return resolve({error:emailError})
        if(data.getFbExtEmail) return this.getPorfileThroughCognitoAuth(client, data.getFbExtEmail, resolve)
        return resolve({error:'notSignUp'})
    }

    fb = (client) => new Promise(async(resolve) => {
        LoginManager.logOut()
        const [error, result] = await to(LoginManager.logInWithReadPermissions(["public_profile", "email"])) 
        if(error || result.isCancelled ) return resolve({error:(error) ? error : 'canceled'})

        new GraphRequestManager().addRequest(new GraphRequest(
            '/me?fields=email',
            null,
            (err, ret) => this.fbGetInfoCallBack( err, ret, resolve, client),
        )).start()
    })

    getSocailMediaSignUpProfile = async(client, email, resolve) => {
        const [confirmError, _] = await to(Auth.confirmSignUp(email, '000000', {forceAliasCreation: false}))
        if(confirmError.code === 'UserNotFoundException') return this.getProfile(client, email, resolve)
        return resolve({error:{message: 'emailAlreadyInUsed'}})
    }

    twitter =  client => new Promise(async(resolve) => {
        RNTwitterSignIn.logOut()
        const [loginError, loginData] = await to(RNTwitterSignIn.logIn())
        if(loginError) return resolve({error:loginError})

        const {email, userID} = loginData
        if(email) this.getSocailMediaSignUpProfile(client, email, resolve)

        const [emailError, {data}] = await to(this.getExtEmail(client, userID, getTwitterExtEmail))
        if(emailError) return resolve({error:emailError})
        if(data.getTwitterExtEmail) return this.getPorfileThroughCognitoAuth(client, data.getTwitterExtEmail, resolve)
        return resolve({error:{message: 'notSignUp'}})
    })
    
    google = client => new Promise(async(resolve) => {
        GoogleSignin.revokeAccess()
        GoogleSignin.signOut()
        const [serviceError, _] = await to(GoogleSignin.hasPlayServices())
        if(serviceError) return resolve({error:{message:'google service not enable'}})
        const [loginError, userInfo] = await to(GoogleSignin.signIn())
        if(loginError) return resolve({error: loginError})
        this.getSocailMediaSignUpProfile(client, userInfo.user.email, resolve)
    })

    emailForgetPassword = (client, account ) => new Promise(async(resolve) => {   
        const {erro, type} = await this.getAccountType(client, account)
        if(erro || type != 'email') return resolve({error:{message:'theEamilUsedForThirdPartyLogin'}})
        const [error, result] = await to(Auth.forgotPassword(account))
        resolve({error, result})
    })

    emailForgotPasswordSubmit = (account, code, password) => new Promise(async(resolve) => {
        const [error, result] = await to(Auth.forgotPasswordSubmit(account, code, password))
        resolve({error, result})
    })
}

const instance = new Signin()
export default instance