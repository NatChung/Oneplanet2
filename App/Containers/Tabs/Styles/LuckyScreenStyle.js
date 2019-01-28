import { StyleSheet } from 'react-native'
import { ApplicationStyles , Fonts} from '../../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex:1,
    
  },
  listContaner: {
    paddingHorizontal:10,
  },
  filterHeader: {
    marginTop: 20,
    marginLeft: 10,
    height: 30,
    flexDirection:'row'
  },
  filterTouchable: {
    flexDirection:'row',
  },
  filterTitle: {
    ...Fonts.style.normal,
    color:'white',
  },
  filterIcon: {
    paddingHorizontal:10
  },
  header: {
    flexDirection: 'row'
  }
})
