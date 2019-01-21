import { StyleSheet } from 'react-native'
import { ApplicationStyles , Metrics} from '../../../Themes'

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
    height: 20,
    backgroundColor:'red'
  }
})
