import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AddEmailScreen from '../Containers/AddEmailScreen'
import TermsScreen from '../Containers/TermsScreen'
import EmailSentScreen from '../Containers/EmailSentScreen'
import AddProfileScreen from '../Containers/AddProfileScreen'
import SignupScreen from '../Containers/SignupScreen'
import TestAppSyncContainer from '../Containers/TestAppSyncContainer';
import TestCognitoContainer from '../Containers/TestCognitoContainer';
import LaunchScreen from '../Containers/LaunchScreen';
import TutorialScreen from '../Containers/TutorialScreen';
import LandingScreen from '../Containers/LandingScreen';
import LoginScreen from '../Containers/LoginScreen';

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  	AddEmailScreen: { screen: AddEmailScreen },
	TermsScreen: { screen: TermsScreen },
	SignupScreen: { screen: SignupScreen },
	LoginScreen: { screen: LoginScreen },
	LandingScreen: { screen: LandingScreen },
},{
	// Default config for all screens
	initialRouteName: 'LandingScreen',
});

const ContentNav = createStackNavigator({
	LaunchScreen: { screen: LaunchScreen }
},{
	initialRouteName: 'LaunchScreen',
})


const PrimarySwitch = createSwitchNavigator({
	EmailSentScreen: { screen: EmailSentScreen },
	AddProfileScreen: { screen: AddProfileScreen },
	TutorialScreen: { screen: TutorialScreen },
	TestAppSyncContainer: { screen: TestAppSyncContainer },
	TestCognitoContainer: { screen: TestCognitoContainer },
	PrimaryNav,
	ContentNav
},{
	initialRouteName: 'TutorialScreen'
})

export default createAppContainer(PrimarySwitch);
