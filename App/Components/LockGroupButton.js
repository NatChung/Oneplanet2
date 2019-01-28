import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/LockGroupButtonStyle'
import I18n from "../I18n";


export default class LockGroupButton extends Component {
  // // Prop type warnings
  static propTypes = {
    selected: PropTypes.oneOf(['left', 'right']).isRequired,
    onPress: PropTypes.func.isRequired,
  }
  //
  // // Defaults for props
  static defaultProps = {
    selected: 'left',
    onPress: () => {}
  }

  buttonBGProps = type => ({
    style: (type === this.props.selected) ? styles.selectBG : styles.buttonBG,
    onPress: () => this.props.onPress(type)
  })

  textProps = type => ( {
    style: (type === this.props.selected) ? styles.selectText : styles.text
  })

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity {...this.buttonBGProps('left')}>
          <Text {...this.textProps('left')}>{I18n.t('products')}</Text>
        </TouchableOpacity>
        <TouchableOpacity {...this.buttonBGProps('right')}>
          <Text {...this.textProps('right')}>{I18n.t('unlocked')}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
