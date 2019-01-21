import { StyleSheet } from 'react-native'
import { Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    height: 60,
    marginTop: 10,
    backgroundColor:'white',
    borderRadius:2,
    overflow: 'hidden',
  },
  productImage: {
    width: 60, 
  },
  contenxtText: {
    flex:1,
    ...Fonts.style.normal,
    paddingLeft: 10,
    alignSelf:'center',
  },
  lockerImage: {
    width: 40,
    height: 40,
  },
  lockerContainer: {
    width: 60,
    justifyContent:'center',
    alignItems:'center'
  },
  lockerTitle: {
    ...Fonts.style.description,
    fontSize: 12,
  }
})
