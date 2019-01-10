import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native'
import styles from './Styles/RoundedTextInputStyle'

export default class RoundedTextInput extends Component {

	static defaultProps = {
    outline: true
  }

  textInputProps = () => {
		const props = {
			...this.props,
			style: [ styles.container, styles.inputText ],
		};

		if (this.props.outline) {
			props.style.push(styles.outline);
		}
		if (this.props.style) {
			props.style.push(this.props.style);
		}

		return props;
	}

  render () {
    const { ...props } = this.textInputProps()
    return (
      <TextInput {...props} />
    )
  }
}
