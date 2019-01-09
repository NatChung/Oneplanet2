import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator, createAppContainer } from 'react-navigation'
import TutorialScreen from '../Containers/TutorialScreen'
import TestAppSyncContainer from '../Containers/TestAppSyncContainer'
import TestCognitoContainer from '../Containers/TestCognitoContainer'
import LaunchScreen from '../Containers/LaunchScreen'


import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  TutorialScreen: { screen: TutorialScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'TutorialScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimarySwitch  = createSwitchNavigator({
  TestAppSyncContainer: { screen: TestAppSyncContainer },
  TestCognitoContainer: { screen: TestCognitoContainer },
  PrimaryNav: PrimaryNav
},{
  initialRouteName: 'TestAppSyncContainer'
})

export default createAppContainer(PrimarySwitch)
