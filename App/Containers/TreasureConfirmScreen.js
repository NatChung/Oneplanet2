import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

// Styles
import styles from './Styles/TreasureConfirmScreenStyle';
import I18n from '../I18n';
import { Images } from '../Themes';
import RoundedButton from '../Components/RoundedButton';
import withOverlay from '../Utils/withOverlay';

class TreasureConfirmScreen extends Component {
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

	onConfirm = () => this.props.close();

	onCancel = () => this.props.close();

	render() {
		return (
			<View style={styles.mainContainer}>
				<View style={styles.header}>
					<Image source={Images.treasure.gem} style={styles.treasureImage} />
				</View>
				<Text style={styles.titleText}>
					Unlock <Text style={[ styles.titleText, styles.treasureText ]}>ProductName</Text> ?
				</Text>
				<Text style={styles.descriptionText}>確定使用一顆解鎖寶？</Text>
				<View style={styles.footer}>
					<RoundedButton {...this.okButtonStyle} onPress={this.onConfirm} />
					<RoundedButton {...this.cancelButtonStyle} onPress={this.onCancel} />
				</View>
			</View>
		);
	}
}

export default withOverlay(TreasureConfirmScreen);
