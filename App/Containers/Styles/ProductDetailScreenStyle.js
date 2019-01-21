import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  adImage: {
    width:Metrics.screenWidth,
    height: Metrics.screenWidth,
  },
  pageContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth + 40,
  },
  LockerContainer: {
    position:'absolute',
    left:10,
    bottom: -20,
    
    alignItems:'center'
  },
  lockerTitle: {
    color:'red',
  },
  contentContainer: {
    marginTop: 40,
    marginHorizontal: 10,

  },
  title: {
    ...Fonts.style.h5,
    color:'white'
  },
  content: {
    marginTop: 20,
    ...Fonts.style.normal,
    color:'white'
  }
})
