import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import _ from 'lodash';

// Styles
import styles from './Styles/RankingScreenStyle';
import RoundedButton from '../../Components/RoundedButton';

const URL = 'https://unsplash.it';
const ADS = Array.from({ length: 5 }).map((_, i) => `${URL}/375/375?random&__id=${'ad'}${i}`);

class RankingScreen extends Component {
	static navigationOptions = {};

	onTest = (action, type) => () => {
		const { navigation } = this.props;

		navigation.navigate('TreasureConfirmScreen', { action, type, product: 'PRODUCT' });
	};

	onTestAd = async () => {
		const { navigation } = this.props;

		const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

		for (const imgUrl of ADS) {
			navigation.push('AdScreen', { imgUrl });
			await delay(500);
		}
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>RankingScreen</Text>
				<View style={{ width: '100%' }}>
					<RoundedButton text="Test Ad with delay" onPress={this.onTestAd} />
					<RoundedButton text="Test Unlock Gem" onPress={this.onTest('unlock', 'gem')} />
					<RoundedButton text="Test Unlock Coin" onPress={this.onTest('unlock', 'coin')} />
					<RoundedButton text="Test Unlock Key" onPress={this.onTest('unlock', 'key')} />
					<RoundedButton text="Test Bid Gem" onPress={this.onTest('bid', 'gem')} />
					<RoundedButton text="Test Bid Coin" onPress={this.onTest('bid', 'coin')} />
				</View>
			</ScrollView>
		);
	}
}

export default RankingScreen;
