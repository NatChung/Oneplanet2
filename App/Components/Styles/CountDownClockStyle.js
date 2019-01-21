import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes';

const ClockBGWidth = Metrics.screenWidth * 0.5
const ClockBGHeith = ClockBGWidth * 0.25

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: Metrics.screenWidth / 2,
    marginTop: 10,
    marginHorizontal: 3,
  },
  tip:{
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.base,
    color: 'grey',
  },
  clockBackground:{
    flexDirection: 'row',
    marginTop: 0,
    width: ClockBGWidth,
    backgroundColor: 'black',
    height: ClockBGHeith,
    borderRadius: 8,
    flexWrap: 'wrap'
  },


  digiNumber:{
    height: ClockBGHeith * 0.4,
    width: ClockBGHeith * 0.4,
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
    flex:1,
    marginTop: 2,
    marginLeft: -2,
    fontSize: 10,
    fontFamily: Fonts.type.emphasis,
    flex: 0.5,
    alignSelf:'center',
    color:'red'
  }
})
