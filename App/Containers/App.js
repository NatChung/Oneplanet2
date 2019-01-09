import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import Amplify from 'aws-amplify';
import SplashScreen from 'react-native-splash-screen';
import AppSyncConfig from '../aws-exports'
import AWSAppSyncClient from 'aws-appsync'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'

Amplify.configure(AppSyncConfig);
// create our store
const store = createStore();

const client = new AWSAppSyncClient({
	url: AppSyncConfig.aws_appsync_graphqlEndpoint,
	region: AppSyncConfig.aws_project_region,
	auth: {
	  type: AppSyncConfig.aws_appsync_authenticationType,
	  apiKey: AppSyncConfig.aws_appsync_apiKey,
	  // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
	},
	complexObjectsCredentials: () => Amplify.Auth.currentCredentials()
  })

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
