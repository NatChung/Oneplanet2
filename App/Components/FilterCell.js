import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/FilterCellStyle'

export default class FilterCell extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   onPress: PropTypes.object,
  //   selected: PropTypes.bool.isRequired,
  // }
  
  // Defaults for props
  static defaultProps = {
    onPress: () => {},
  }

  onPress = () => {
    const {item, index} = this.props
    this.props.onPress({item, index})
  }

  componentDidMount = () => {
    console.tron.log(this.props)
  }

  render () {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <Text style={styles.title}>FilterCell Component</Text>
        <View style={styles.selectedContainer}>
          <Text style={styles.number}>1</Text>
          {(this.props.item.selected) ? <Icon name='check-circle' size={20} color='red' /> : null}
        </View>
        

      </TouchableOpacity>
    )
  }
}
