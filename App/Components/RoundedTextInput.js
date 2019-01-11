import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styles from './Styles/RoundedTextInputStyle';

export default class RoundedTextInput extends Component {
	static propTypes = {
		outline: PropTypes.bool,
		error: PropTypes.string
	};

	static defaultProps = {
		outline: true
	};

	textInputProps = () => {
		const props = {
			...this.props,
			style: [ styles.inputText ],
			containerStyle: [ styles.container ]
		};

		if (this.props.outline) {
			props.containerStyle.push(styles.outline);
		}
		if (this.props.style) {
			props.style.push(this.props.style);
		}
		if (this.props.containerStyle) {
			props.containerStyle.push(this.props.containerStyle);
		}
		if (this.props.error) {
			props.containerStyle.push(styles.errorOutLine);
		}

		return props;
	};

	render() {
		const { containerStyle, error, ...props } = this.textInputProps();
		return (
			<View>
				<View style={containerStyle}>
					<TextInput {...props} />
				</View>
				{error ? <Text style={styles.error}>{error}</Text> : null}
			</View>
		);
	}
}
