import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  status: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingLeft: 10,
    textAlign:'center'
  },
  input: {
    backgroundColor:'lightgrey',
    height: 44,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingLeft: 10,
  },
  headerInfo:{
    flexDirection:'row'
  },
  refresh:{
    alignSelf:'center',
  }
})
