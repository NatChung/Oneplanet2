import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container:{
    flex:1,
    backgroundColor:'black',
    paddingTop:10,
  },
  titleInputContainer: {
    flexDirection:'row',
    height: 50,
    marginTop: 0,
    alignItems:'center',
    paddingLeft: 20,
  },
  titleText: {
    flex:1,
		color: 'lightgrey',
    fontSize: Fonts.size.input,
  },
  titleInput: {
    flex: 3,
    color: Colors.snow,
    fontSize: Fonts.size.h6,
    borderBottomColor:'grey',
    height:50,
    borderWidth: 1,
  },
  doneButton: {
    
  }
})
