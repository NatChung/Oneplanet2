import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import Amplify from 'aws-amplify';
import SplashScreen from 'react-native-splash-screen';
import AppSyncConfig from '../aws-exports';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import { GoogleSignin } from 'react-native-google-signin'

GoogleSignin.configure({
	scopes: ['email', 'profile', 'openid' ], // what API you want to access on behalf of the user, default is email and profile
	webClientId: '883353348649-k5lqtthfc0e8brfe47ufi4rkkp99r7pm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
	offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
	hostedDomain: '', // specifies a hosted domain restriction
	loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
	forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
	accountName: '', // [Android] specifies an account name on the device that should be used,
	iosClientId:'883353348649-jbnu41msip3h4gue1nmikcpn43b7pirf.apps.googleusercontent.com'
  })

Amplify.configure(AppSyncConfig);
// create our store
const store = createStore();

const client = new AWSAppSyncClient({
	url: AppSyncConfig.aws_appsync_graphqlEndpoint,
	region: AppSyncConfig.aws_project_region,
	auth: {
		type: AppSyncConfig.aws_appsync_authenticationType,
		apiKey: "da2-5g7wtkr52nhi3iw6hdqoe3qip4"
		// jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
	},
	complexObjectsCredentials: () => Amplify.Auth.currentCredentials()
});

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
		return (
			<Provider store={store}>
				<ApolloProvider client={client}>
					<Rehydrated>
						<RootContainer />
					</Rehydrated>
				</ApolloProvider>
			</Provider>
		);
	}
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App);
