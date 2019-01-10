import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './Styles/RichI18NStyle';
import I18n from '../I18n';

export default class RichI18N extends Component {
	// Prop type warnings
	static propTypes = {
		id: PropTypes.string.isRequired,
		values: PropTypes.object,
		component: PropTypes.any,
		style: PropTypes.object
	};

	// Defaults for props
	static defaultProps = {
		values: {},
		component: Text,
		style: {}
	};

	render() {
		const { id, values, component: Component, ...props } = this.props;
		const keys = Object.keys(values);
		const placeHolders = {};
		keys.forEach((key) => (placeHolders[key] = `{{${key}}}`));
		const translation = I18n.t(id, { ...placeHolders }) || '';
		const splitted = translation.split(/(?:\{\{|%\{)(.*?)(?:\}\}?)/gm);
		const interpolated = [];

		splitted.forEach((str, i) => {
			if (i % 2 === 0) {
				interpolated.push(str);
			} else {
				const child = values[str];
				if (typeof child === 'string') {
					interpolated.push(child);
				} else {
					interpolated.push(React.cloneElement(child, { key: i }));
				}
			}
		});
		return <Component {...props}>{interpolated}</Component>;
	}
}
