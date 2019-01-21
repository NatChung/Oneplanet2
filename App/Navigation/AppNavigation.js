import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ProductDetailScreen from '../Containers/ProductDetailScreen'

import ForgetPasswordScreen from '../Containers/ForgetPasswordScreen';
import AddEmailScreen from '../Containers/AddEmailScreen';
import TermsScreen from '../Containers/TermsScreen';
import EmailSentScreen from '../Containers/EmailSentScreen';
import AddProfileScreen from '../Containers/AddProfileScreen';
import SignupScreen from '../Containers/SignupScreen';
import TestAppSyncContainer from '../Containers/TestAppSyncContainer';
import TestCognitoContainer from '../Containers/TestCognitoContainer';
import LaunchScreen from '../Containers/LaunchScreen';
import TutorialScreen from '../Containers/TutorialScreen';
import LandingScreen from '../Containers/LandingScreen';
import LoginScreen from '../Containers/LoginScreen';

import createTabNavigator from './Navigators/createTabNavigator';
import TabBar from '../Components/TabBar';
import {
	OfficialScreen,
	PartyScreen,
	HotScreen,
	AlienScreen,
	RankingScreen,
	LiveScreen,
	LuckyScreen,
	MyScreen
} from '../Containers/Tabs';

import { Images } from '../Themes';

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
		ForgetPasswordScreen: { screen: ForgetPasswordScreen },
		AddEmailScreen: { screen: AddEmailScreen },
		SignupScreen: { screen: SignupScreen },
		LoginScreen: { screen: LoginScreen },
		LandingScreen: { screen: LandingScreen }
	},
	{
		// Default config for all screens
		initialRouteName: 'LandingScreen'
	}
);

const ContentTabs = createTabNavigator(
	{
		OfficialScreen: { screen: OfficialScreen },
		PartyScreen: { screen: PartyScreen },
		HotScreen: { screen: HotScreen },
		AlienScreen: { screen: AlienScreen },
		RankingScreen: { screen: RankingScreen },
		LiveScreen: { screen: LiveScreen },
		LuckyScreen: { screen: LuckyScreen },
		MyScreen: { screen: MyScreen }
	},
	{
		initialRouteName: 'LuckyScreen',
		tabBarComponent: TabBar,
		tabBarOptions: { showLabel: false },
		customOptions: {
			top: {
				acceptRoutes: [ 'OfficialScreen', 'PartyScreen', 'HotScreen', 'AlienScreen', 'RankingScreen' ],
				style: { backgroundColor: '#191919', height: 60 }
			},
			bottom: {
				acceptRoutes: [ 'LiveScreen', 'LuckyScreen', 'MyScreen' ],
				backgroundImage: Images.tabBarBackgroundImage
			}
		}
	}
);

const ContentNav = createStackNavigator({
	ContentTabs,
	ProductDetailScreen: { screen: ProductDetailScreen },
},{
	initialRouteName: 'ContentTabs',
	headerMode:'none'
})

const PrimarySwitch = createSwitchNavigator(
	{
		EmailSentScreen: { screen: EmailSentScreen },
		AddProfileScreen: { screen: AddProfileScreen },
		TutorialScreen: { screen: TutorialScreen },
		PrimaryNav,//Loing & signup
		ContentNav
	},
	{
		initialRouteName: 'ContentNav'
	}
);

const RootStack = createStackNavigator(
	{
		PrimarySwitch: { screen: PrimarySwitch },
		TermsScreen: { screen: TermsScreen },
	},
	{
		initialRouteName: 'PrimarySwitch',
		mode: 'modal',
		headerMode: 'none'
	}
);

export default createAppContainer(RootStack);
