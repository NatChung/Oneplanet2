import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  adImage: {
    width:Metrics.screenWidth,
    height: Metrics.screenWidth,
  }
})
