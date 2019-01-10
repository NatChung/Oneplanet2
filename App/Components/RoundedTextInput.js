import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, Text } from 'react-native'
import styles from './Styles/RoundedTextInputStyle'

export default class RoundedTextInput extends Component {

	static propTypes = {
		outline: PropTypes.bool,
		error: PropTypes.string
	}
	
	static defaultProps = {
    outline: true
  }

  textInputProps = () => {
		const props = {
			...this.props,
			style: [ styles.inputContainer, styles.inputText ],
		};

		if (this.props.outline) {
			props.style.push(styles.outline);
		}
		if (this.props.style) {
			props.style.push(this.props.style);
		}

		if(this.props.error){
			props.style.push(styles.errorOutLine);
		}

		return props;
	}

  render () {
    return (
			<View style={styles.container}>
      	<TextInput {...this.textInputProps()} />
				{(this.props.error) ? (<Text style={styles.error}>{this.props.error}</Text>) : null}
			</View>
    )
  }
}
