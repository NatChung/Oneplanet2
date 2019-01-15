import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1,
    backgroundColor:'black',
  },
  text:{
    ...Fonts.style.description,
    color: Colors.snow,
    textAlign: 'center',
    marginHorizontal: 45,
    marginVertical: 30,
  },
  signupButton:{
    marginTop: 30,
    backgroundColor:Colors.oneplanet.button
  }
})
