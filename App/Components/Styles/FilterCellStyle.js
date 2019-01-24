import { StyleSheet } from 'react-native'
import { Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    height: 60,
    borderBottomColor:'grey',
    borderBottomWidth: 1,
    marginLeft: 20,
    paddingRight: 20,
    alignItems:'center'
  },
  title: {
    ...Fonts.style.normal,
    color:'white',
    flex:1,
  },
  number: {
    ...Fonts.style.normal,
    color:'white',
    marginRight:20,
  },
  selectedContainer: {
    flexDirection:'row',
    alignItems:'center',
    width: 60,
  }
})
