import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('Rounded Button', () =>
  <RoundedButton
    text='real buttons have curves'
    onPress={() => window.alert('Rounded Button Pressed!')}
  />
)

export default class RoundedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    outline: PropTypes.bool,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText
  }

  buttonProps = () => {
		// Defaults
		const props = {
      ...this.props,
      style: [styles.button],
			textStyle: [styles.buttonText]
		};

    if (this.props.outline) {
			props.textStyle.push(styles.outlineText);
			props.style.push(styles.outline);
		}
		if (this.props.style) {
			props.style.push(this.props.style);
		}
		if (this.props.textStyle) {
			props.textStyle.push(this.props.textStyle);
		}

		return props;
	};

  render () {
    const {textStyle, ...props} = this.buttonProps();
    return (
      <TouchableOpacity {...props}>
        <Text style={textStyle}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
