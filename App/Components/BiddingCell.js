import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/BiddingCellStyle'
import { Images } from "../Themes";

export default class BiddingCell extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Image style={styles.productImage} source={{uri:'https://via.placeholder.com/60'}} />
        <Text style={styles.contenxtText}>Bidding kkkkkk sljfkajdskfjalskfjas; lksjdf;a lsfjkasd;fjds;</Text>
        <View style={styles.lockerContainer}>
          <Image style={styles.lockerImage} source={Images.lucky.lock.on} />
          <Text style={styles.lockerTitle}>Locker</Text>
        </View>
        
      </TouchableOpacity>
    )
  }
}
