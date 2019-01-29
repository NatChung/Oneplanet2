import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import styles from './Styles/CheckBoxStyle';

export default class CustomCheckBox extends Component {
	static defaultProps = {
		checkedColor: 'white'
	};

	checkboxProps = () => {
		const props = {
			...this.props,
			title: this.props.text,
			containerStyle: [ styles.checkbox ],
			textStyle: [ styles.checkboxText ]
		};

		if (this.props.style) {
			props.containerStyle.push(this.props.style);
		}
		if (this.props.textStyle) {
			props.textStyle.push(this.props.textStyle);
		}

		return props;
	};

	render() {
		return <CheckBox {...this.checkboxProps()} />;
	}
}
