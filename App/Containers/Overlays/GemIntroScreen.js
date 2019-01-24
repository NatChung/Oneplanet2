import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Styles
import styles from './Styles/GemIntroScreenStyle';
import I18n from '../../I18n';
import { Images } from '../../Themes';
import withOverlay from '../../Utils/withOverlay';
import RoundedButton from '../../Components/RoundedButton';
import RichI18n from '../../Components/RichI18n';

class GemIntroScreen extends Component {
	buttonStyle = {
		style: styles.button,
		text: I18n.t('前往 LIVE 上傳照片')
	};

	richI18nMaps = {
		紅金寶: <Text style={styles.highlightText}>{I18n.t('紅金寶')}</Text>
	};

	onConfirm = () => this.props.close();

	onCancel = () => this.props.close();

	render() {
		const items = [
			'用途於 解鎖商品 和 投標商品。',
			'獲得方式：畫面左上角競標條在上傳照片後會加分，競標條滿格即獲得一顆。',
			'將 競標寶 升級為 {{紅金寶}}，有助於競標時的效率。',
			'升級一顆 {{紅金寶}} 需要一顆 競標寶。'
		];
		return (
			<View style={styles.mainContainer}>
				<View style={styles.header}>
					<Image style={styles.treasureImage} source={Images.treasure.gem} />
					<Text style={styles.titleText}>{I18n.t('競標寶')}</Text>
				</View>
				<View style={styles.body}>
					<Text style={styles.descriptionText}>{I18n.t('使用一顆 競標寶 + 1.99 美金，即可解鎖一項商品或對商品投標一次。')}</Text>
					{items.map((key, i) => (
						<View key={i} style={styles.row}>
							<View style={styles.bullet}>
								<Text>{'\u2022'}</Text>
							</View>
							<RichI18n id={key} style={styles.bulletText} values={this.richI18nMaps} />
						</View>
					))}
				</View>
				<RoundedButton {...this.buttonStyle} onPress={this.onConfirm} />
				<TouchableOpacity style={styles.cancelButton} onPress={this.onCancel}>
					<Image source={Images.icons.cancelBlack} />
				</TouchableOpacity>
			</View>
		);
	}
}

export default withOverlay(GemIntroScreen);
