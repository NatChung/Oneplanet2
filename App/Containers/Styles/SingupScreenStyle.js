import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics,Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex:1,
  },
  text:{
    ...Fonts.style.description,
    color: Colors.snow,
    textAlign: 'center'
  },
  quickTitle:{
    marginBottom: 5,
    ...Fonts.style.description,
    color: Colors.snow,
    textAlign: 'center'
  },
  socailMediaContainer:{
    flex:1,
    flexDirection: 'column-reverse',
    paddingBottom: 35,
  },
  emailContainer: {
    flex:2.7,
    
  }
})
