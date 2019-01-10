import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/SocailMediaButtonsStyle'
import {Images} from "../Themes";

const IconButton = props => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Image source={props.source}/>
  </TouchableOpacity>
)

export default class SocailMediaButtons extends Component {
  // // Prop type warnings
  static propTypes = {
    onFb: PropTypes.func,
    onTwitter: PropTypes.func,
    onGoogle: PropTypes.func,
    onWechat: PropTypes.func,
  }
  
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.buttonsConatiner}>
          <IconButton source={Images.socailmedia.fb} onPress={this.props.onFb} />
          <IconButton source={Images.socailmedia.twitter} onPress={this.props.onTwitter} />
          <IconButton source={Images.socailmedia.google}  onPress={this.props.onGoogle} />
          <IconButton source={Images.socailmedia.wechat}  onPress={this.props.onWechat} />
        </View>
      </View>
    )
  }
}
