
import { Auth } from 'aws-amplify'
import to from 'await-to-js'

class Signup {

    emailResend = email => new Promise(async(resolve) => {
        const [error, result] = await to(Auth.resendSignUp(email))
        resolve({error, result})
    })
}

const instance = new Signup()
export default instance