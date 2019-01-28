import { StyleSheet } from 'react-native'
import { ApplicationStyles , Fonts} from '../../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex:1,
    
  },
  listContaner: {
    marginTop: 20,
    paddingHorizontal:10,
  },
  filterHeader: {
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
