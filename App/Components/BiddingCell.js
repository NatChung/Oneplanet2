import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/BiddingCellStyle'
import { Images } from "../Themes"
import LockerButton from "./LockerButton"

export default class BiddingCell extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  static defaultProps = {
    onLockPress: () => {}
  }

  LockerButtonProps = () => ({
    onPress:() => this.props.onLockPress(this.props.index),
     style:styles.lockerContainer,
     locked:this.props.item.locked
  })

  render () {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Image style={styles.productImage} source={{uri:this.props.item.image}} />
        <Text style={styles.contenxtText}>{this.props.item.title}</Text>
        <LockerButton {...this.LockerButtonProps()}/>
      </TouchableOpacity>
    )
  }
}
