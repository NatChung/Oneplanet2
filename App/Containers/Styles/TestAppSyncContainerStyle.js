import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  input: {
    backgroundColor:'lightgrey',
    height: 44,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  error: {
    ...Fonts.style.normal,
    marginTop: 20,
    textAlign:'center'
  },
  uploadImage:{
    flex:1,
    height: 50,
    marginHorizontal: 20,
  }
})
