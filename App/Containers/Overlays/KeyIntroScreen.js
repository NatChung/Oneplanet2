import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Styles
import styles from './Styles/KeyIntroScreenStyle';
import I18n from '../../I18n';
import { Images } from '../../Themes';
import withOverlay from '../../Utils/withOverlay';
import RoundedButton from '../../Components/RoundedButton';
import RichI18n from '../../Components/RichI18n';

class KeyIntroScreen extends Component {
	buttonStyle = {
		style: styles.button,
		text: I18n.t('前往 通知 查看獎勵')
	};

	richI18nMaps = {
		排行榜: <Text style={styles.highlightText}>{I18n.t('排行榜')}</Text>,
		活動: <Text style={styles.highlightText}>{I18n.t('活動')}</Text>
	};

	onConfirm = () => this.props.close();

	onCancel = () => this.props.close();

	render() {
		const items = [
			'用途於 解鎖商品。',
			'獲得方式一：每週 {{排行榜}} 之冠軍 Group，該 Group 全部用戶獲得一顆。',
			'獲得方式二：條件贈送，請關注 {{活動}}。',
			'獲得方式二：Supreme.AI (官方) 喜歡你的相片。'
		];
		return (
			<View style={styles.mainContainer}>
				<View style={styles.header}>
					<Image style={styles.treasureImage} source={Images.treasure.key} />
					<Text style={styles.titleText}>{I18n.t('解鎖寶')}</Text>
				</View>
				<View style={styles.body}>
					<Text style={styles.descriptionText}>{I18n.t('使用一顆 解鎖寶 即可直接解鎖一項商品。')}</Text>
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

export default withOverlay(KeyIntroScreen);
