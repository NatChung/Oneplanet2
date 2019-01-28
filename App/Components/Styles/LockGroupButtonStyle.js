import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes'

const ClockBGWidth = Metrics.screenWidth * 0.5 -10
const ClockBGHeith = ClockBGWidth * 0.25

export default StyleSheet.create({
  container: {
    flex:1,
    marginTop: 10,
    marginLeft: 5,
    marginRight:10,
    borderWidth: 1,
    borderColor:'#5FD2CE',
    borderRadius: 8,
    flexDirection:'row',
    overflow:'hidden',
    
  },
  leftBG: {
    flex:1,
    
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: {
    color:'#5FD2CE',
  },
  buttonBG: {
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  selectBG: {
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center' ,
    backgroundColor:'#5FD2CE',
  },
  selectText: {
    color:'white',
  }

})
