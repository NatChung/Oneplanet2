import { createStackNavigator, createAppContainer } from 'react-navigation'
import TestCognitoContainer from '../Containers/TestCognitoContainer'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  TestCognitoContainer: { screen: TestCognitoContainer },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'TestCognitoContainer',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
