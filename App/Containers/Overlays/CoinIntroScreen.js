import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Styles
import styles from './Styles/CoinIntroScreenStyle';
import I18n from '../../I18n';
import { Images } from '../../Themes';
import withPopup from '../../Utils/withPopup';
import RoundedButton from '../../Components/RoundedButton';
import RichI18n from '../../Components/RichI18n';

class CoinIntroScreen extends Component {
	buttonStyle = {
		style: styles.button,
		text: I18n.t('前往 通知 查看獎勵')
	};

	richI18nMaps = {
		競標寶: <Text style={styles.highlightText}>{I18n.t('競標寶')}</Text>
	};

	onPurchase = () => this.props.close();

	onCancel = () => this.props.close();

	renderPurchaseList = () => {
		const products = [
			{ name: I18n.t('10 送 1'), price: 19.9 },
			{ name: I18n.t('50 送 6'), price: 99.5 },
			{ name: I18n.t('100 送 13'), price: 199 }
		];
		return products.map(({ name, price }, i) => (
			<View key={i} style={styles.productRow}>
				<Image style={styles.productIcon} source={Images.treasure.coinSmall} />
				<Text style={styles.productText}>{name}</Text>
				<RoundedButton style={styles.purchaseButton} text={`$${price}`} onPress={this.onPurchase} />
			</View>
		));
	};

	render() {
		const items = [ 
      '用途於 解鎖商品 和 投標商品。', 
      '將 {{競標寶}} 升級為 紅金寶，有助於競標時的效率（投標無需等待內支付）。', 
      '升級一顆 紅金寶 需要一顆 {{競標寶}}。' 
    ];
		return (
			<View style={styles.mainContainer}>
				<View style={styles.header}>
					<Image style={styles.treasureImage} source={Images.treasure.coin} />
					<Text style={styles.titleText}>{I18n.t('紅金寶')}</Text>
				</View>
				<View style={styles.body}>
					<Text style={styles.descriptionText}>{I18n.t('使用一顆 紅金寶，即可解鎖一項商品或對商品投標一次。')}</Text>
					{items.map((key, i) => (
						<View key={i} style={styles.row}>
							<View style={styles.bullet}>
								<Text>{'\u2022'}</Text>
							</View>
							<RichI18n id={key} style={styles.bulletText} values={this.richI18nMaps} />
						</View>
					))}
				</View>
				<View style={styles.footer}>{this.renderPurchaseList()}</View>
				<TouchableOpacity style={styles.cancelButton} onPress={this.onCancel}>
					<Image source={Images.icons.cancelBlack} />
				</TouchableOpacity>
			</View>
		);
	}
}

export default withPopup(CoinIntroScreen);
