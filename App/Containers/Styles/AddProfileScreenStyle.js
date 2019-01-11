import { StyleSheet } from 'react-native'
import { ApplicationStyles,Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: Metrics.screenHeight * 0.12,
  },
  text:{
    ...Fonts.style.description,
    color: Colors.snow,
    textAlign: 'center'
  },
  imageButton: {
    alignSelf:'center',
  },
  nextButton: {
    marginTop: 30,
    backgroundColor:Colors.oneplanet.button
  },
  avatar:{
    marginVertical: 40,
  },
})
