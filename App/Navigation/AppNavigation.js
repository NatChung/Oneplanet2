import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator, createAppContainer } from 'react-navigation'
import TestAppSyncContainer from '../Containers/TestAppSyncContainer'
import TestCognitoContainer from '../Containers/TestCognitoContainer'
import LaunchScreen from '../Containers/LaunchScreen'


import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
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
