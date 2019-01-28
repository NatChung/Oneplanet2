import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes';

const ClockBGWidth = Metrics.screenWidth * 0.5 -10
const ClockBGHeith = ClockBGWidth * 0.25

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 8,
    marginRight:2,
  },
  tip:{
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.base,
    color: 'grey',
  },
  clockBackground:{
    flexDirection: 'row',
    width: ClockBGWidth ,
    height: ClockBGHeith,
    flexWrap: 'wrap'
  },

  digiNumber:{
    height: ClockBGHeith * 0.45,
    width: ClockBGHeith * 0.45,
    marginTop: 10,
  },
  space:{
    width: ClockBGHeith * 0.15
  },
  segmentBG:{
    flex: 1,
  },
  numbrerBG:{
    flex:1,
    flexDirection:'row'
  },
  timeTitle:{
    fontSize: 8,
    fontFamily: Fonts.type.emphasis,
    flex: 0.5,
    alignSelf:'center',
    color:'red'
  },
  imageBG: {
    position:'absolute',
    height: ClockBGHeith ,
    width: ClockBGWidth  ,
  }
})
