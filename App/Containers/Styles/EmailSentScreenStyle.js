import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  okButton: {
    marginTop: 30,
    backgroundColor:Colors.oneplanet.button
  },
  info:{
    ...Fonts.style.h5,
    color: Colors.snow,
    textAlign: 'center',
    marginHorizontal:70,
    textAlign:'left'
  },
  infoContainer:{
    flex: 0.45,
    justifyContent:'flex-end'
  }
})
