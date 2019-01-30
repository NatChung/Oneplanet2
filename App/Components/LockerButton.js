import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Image } from 'react-native'
import { Images } from "../Themes";
import styles from './Styles/LockerButtonStyle'

export default class LockerButton extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  static defaultProps = {
    locked: true
  }

  render () {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
            <Image source={(this.props.locked) ? Images.lucky.lock.off : Images.lucky.lock.on} />
            <Text style={(this.props.locked) ? styles.lockerTitle : styles.unlockerTitle }>{(this.props.locked) ? 'Lock' : 'Unlock'}</Text>
      </TouchableOpacity>
    )
  }
}
