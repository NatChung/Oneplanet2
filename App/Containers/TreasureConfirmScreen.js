import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

// Styles
import styles from './Styles/TreasureConfirmScreenStyle';
import I18n from '../I18n';
import { Images } from '../Themes';
import RoundedButton from '../Components/RoundedButton';
import RichI18n from '../Components/RichI18n';
import withOverlay from '../Utils/withOverlay';

class TreasureConfirmScreen extends Component {
	state = {
		action: this.props.navigation.getParam('action'),
		type: this.props.navigation.getParam('type'),
		product: this.props.navigation.getParam('product')
	};

	okButtonStyle = {
		style: styles.okButton,
		text: I18n.t('ok')
	};

	cancelButtonStyle = {
		style: styles.cancelButton,
		text: I18n.t('cancel'),
		textStyle: styles.cancelText,
		outline: true
	};

	get richI18nMaps() {
		const { type, product } = this.state;
		return {
			product: <Text style={[ styles.titleText, styles.treasureText ]}>{product}</Text>,
			treasure: I18n.t(type),
			price: 1.99
		};
	}

	get title() {
		const { action } = this.state;
		return {
			unlock: 'unlockTreasure',
			bid: 'bidTreasureOnce'
		}[action];
	}

	get description() {
		const { type } = this.state;
		switch (type) {
			case 'gem':
				return I18n.t('areYouSureToUseOneTreasureAndServiceFee', this.richI18nMaps);
			default:
				return I18n.t('areYouSureToUseOneTreasure', this.richI18nMaps);
		}
	}

	onConfirm = () => this.props.close();

	onCancel = () => this.props.close();

	render() {
		const { type } = this.state;

		return (
			<View style={styles.mainContainer}>
				<View style={styles.header}>
					<Image source={Images.treasure[type]} style={styles.treasureImage} />
				</View>
				<RichI18n id={this.title} style={styles.titleText} values={this.richI18nMaps} />
				<Text style={styles.descriptionText}>{this.description}</Text>
				<View style={styles.footer}>
					<RoundedButton {...this.okButtonStyle} onPress={this.onConfirm} />
					<RoundedButton {...this.cancelButtonStyle} onPress={this.onCancel} />
				</View>
			</View>
		);
	}
}

export default withOverlay(TreasureConfirmScreen);
