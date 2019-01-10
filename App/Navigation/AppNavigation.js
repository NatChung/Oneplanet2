import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SingupScreen from '../Containers/SingupScreen'
import TestAppSyncContainer from '../Containers/TestAppSyncContainer';
import TestCognitoContainer from '../Containers/TestCognitoContainer';
import LaunchScreen from '../Containers/LaunchScreen';
import TutorialScreen from '../Containers/TutorialScreen';
import LandingScreen from '../Containers/LandingScreen';
import LoginScreen from '../Containers/LoginScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
	SingupScreen: { screen: SingupScreen },
	LoginScreen: { screen: LoginScreen },
	LandingScreen: { screen: LandingScreen },
	LaunchScreen: { screen: LaunchScreen }
},{
	// Default config for all screens
	initialRouteName: 'SingupScreen',
});


const PrimarySwitch = createSwitchNavigator(
	{
		TutorialScreen: { screen: TutorialScreen },
		TestAppSyncContainer: { screen: TestAppSyncContainer },
		TestCognitoContainer: { screen: TestCognitoContainer },
		PrimaryNav
	},
	{
		  initialRouteName: 'PrimaryNav'
	}
)

export default createAppContainer(PrimarySwitch);
