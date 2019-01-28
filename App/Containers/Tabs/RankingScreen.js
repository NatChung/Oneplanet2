import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

// Styles
import styles from './Styles/RankingScreenStyle';
import RoundedButton from '../../Components/RoundedButton';

class RankingScreen extends Component {
	static navigationOptions = {};

	onTest = (action, type) => () => {
		const { navigation } = this.props;

		navigation.navigate('TreasureConfirmScreen', { action, type, product: 'PRODUCT' });
	};

	render() {
		return (
			<ScrollView style={styles.mainContainer}>
				<Text>RankingScreen</Text>
				<View style={{ width: '100%' }}>
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
