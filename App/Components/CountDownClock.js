import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/CountDownClockStyle'
import { Images } from '../Themes'
import converter from '../Transforms/ConvertFromSecs'

export default class CountDownClock extends Component {
  // // Prop type warnings
  static propTypes = {
    seconds: PropTypes.number
  }
  //
  // Defaults for props
  static defaultProps = {
    seconds: 0
  }

  _getOnesOfDay(time) {
    return time.day % 10
  }

  _getTensOfDay(time) {
    return Math.floor(time.day / 10)
  }

  _getOnesOfHour(time) {
    return time.hour % 10
  }

  _getTensOfHour(time) {
    return Math.floor(time.hour / 10)
  }

  _getOnesOfMinute(time) {
    return time.minute % 10
  }

  _getTensOfMinute(time) {
    return Math.floor(time.minute / 10)
  }

  _getOnesOfSecond(time) {
    return time.second % 10
  }

  _getTensOfSecond(time) {
    return Math.floor(time.second / 10)
  }

  render() {
    let time = converter(this.props.seconds)
    return (
      <View style={[styles.container, this.props.style]}>
        <Image style={styles.imageBG} resizeMode='stretch' source={Images.lucky.countdownBG} />
        <View style={styles.clockBackground} >

        <View style={styles.space} />

          <View style={styles.segmentBG}>
            <View style={styles.numbrerBG}>
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getTensOfDay(time)]} />
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getOnesOfDay(time)]} />
            </View>
            <Text style={styles.timeTitle}>DAYS</Text>
          </View>

          <View style={styles.space} />

          <View style={styles.segmentBG}>
            <View style={styles.numbrerBG}>
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getTensOfHour(time)]} />
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getOnesOfHour(time)]} />
            </View>
            <Text style={styles.timeTitle}>HRS</Text>
          </View>

          <View style={styles.space} />

          <View style={styles.segmentBG}>
            <View style={styles.numbrerBG}>
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getTensOfMinute(time)]} />
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getOnesOfMinute(time)]} />

            </View>
            <Text style={styles.timeTitle}>MINS</Text>
          </View>

          <View style={styles.space} />


          <View style={styles.segmentBG}>
            <View style={styles.numbrerBG}>
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getTensOfSecond(time)]} />
              <Image style={styles.digiNumber} resizeMode='contain' source={Images.lucky.digiNumber[this._getOnesOfSecond(time)]} />
            </View>

            <Text style={styles.timeTitle}>SECS</Text>
          </View>



          <View style={styles.space} />

          
        </View>

        

      </View>
    )
  }
}
