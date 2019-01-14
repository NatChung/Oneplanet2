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
  nextButton: {
    marginTop: 30,
    backgroundColor:Colors.oneplanet.button
  },
  avatar:{
    marginVertical: 40,
    width: 80,
    height: 80,
    alignSelf:'center',
  },
  avatarOutline: {
    backgroundColor: 'transparent',
		borderWidth: 1,
    borderColor: Colors.snow,
    borderRadius: 40,
  }
})
