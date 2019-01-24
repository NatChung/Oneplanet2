import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CoinIntroScreen from '../Containers/Overlays/CoinIntroScreen';
import KeyIntroScreen from '../Containers/Overlays/KeyIntroScreen';
import GemIntroScreen from '../Containers/Overlays/GemIntroScreen';
import TreasureConfirmScreen from '../Containers/Overlays/TreasureConfirmScreen';

import ProductFilterScreen from '../Containers/ProductFilterScreen';
import ProductDetailScreen from '../Containers/ProductDetailScreen';
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
import TabBar, { topTabBarIcon, bottomTabBarIcon } from '../Components/TabBar';
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
import TransitionConfigs from '../Utils/TransitionConfigs';
import { Images } from '../Themes';

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
	{
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

const LuckyStack = createStackNavigator(
	{
		LuckyScreen: { screen: LuckyScreen },
		ProductDetailScreen: { screen: ProductDetailScreen }
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarVisible: !navigation.state.index > 0
		})
	}
);

const ContentTabs = createTabNavigator(
	{
		OfficialScreen: { screen: OfficialScreen, navigationOptions: { tabBarIcon: topTabBarIcon('official') } },
		PartyScreen: { screen: PartyScreen, navigationOptions: { tabBarIcon: topTabBarIcon('party') } },
		HotScreen: { screen: HotScreen, navigationOptions: { tabBarIcon: topTabBarIcon('hot') } },
		AlienScreen: { screen: AlienScreen, navigationOptions: { tabBarIcon: topTabBarIcon('alien') } },
		RankingScreen: { screen: RankingScreen, navigationOptions: { tabBarIcon: topTabBarIcon('ranking') } },
		LiveScreen: { screen: LiveScreen, navigationOptions: { tabBarIcon: bottomTabBarIcon('live') } },
		LuckyStack: { screen: LuckyStack, navigationOptions: { tabBarIcon: bottomTabBarIcon('lucky') } },
		MyScreen: { screen: MyScreen, navigationOptions: { tabBarIcon: bottomTabBarIcon('my') } }
	},
	{
		initialRouteName: 'HotScreen',
		tabBarComponent: TabBar,
		tabBarOptions: { showLabel: false },
		customOptions: {
			top: {
				acceptRoutes: [ 'OfficialScreen', 'PartyScreen', 'HotScreen', 'AlienScreen', 'RankingScreen' ],
				style: { backgroundColor: '#191919', height: 60 }
			},
			bottom: {
				acceptRoutes: [ 'LiveScreen', 'LuckyStack', 'MyScreen' ],
				backgroundImage: Images.tabBarBackgroundImage
			}
		}
	}
);

const PrimarySwitch = createSwitchNavigator(
	{
		EmailSentScreen: { screen: EmailSentScreen },
		AddProfileScreen: { screen: AddProfileScreen },
		TutorialScreen: { screen: TutorialScreen },
		PrimaryNav, //Loing & signup
		// ContentNav,
		ContentTabs
	},
	{
		initialRouteName: 'ContentTabs'
	}
);

const RootStack = createStackNavigator(
	{
		PrimarySwitch: { screen: PrimarySwitch },
		TermsScreen: { screen: TermsScreen },
		ProductFilterScreen: { screen: ProductFilterScreen },
		TreasureConfirmScreen: { screen: TreasureConfirmScreen, params: { transition: 'overlay' } },
		CoinIntroScreen: { screen: CoinIntroScreen, params: { transition: 'overlay' } },
		KeyIntroScreen: { screen: KeyIntroScreen, params: { transition: 'overlay' } },
		GemIntroScreen: { screen: GemIntroScreen, params: { transition: 'overlay' } }
	},
	{
		initialRouteName: 'PrimarySwitch',
		mode: 'modal',
		defaultNavigationOptions: { header: null },

		transparentCard: true,
		transitionConfig: TransitionConfigs.getTransitionConfig
	}
);

export default createAppContainer(RootStack);
