import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';
import _ from 'lodash';

// Styles
import styles from './Styles/HotScreenStyle';
import withCollapsible from '../../Utils/withCollapsible';
import RoundedButton from '../../Components/RoundedButton';

const URL = 'https://unsplash.it/300/300/';
const PHOTOS = Array.from({ length: 24 }).map((_, i) => `${URL}?random&__id=${+new Date()}${i}`);

class HotScreen extends Component {
	static navigationOptions = {};

	state = {};

	onTest = (action, type) => () => {
		const { navigation } = this.props;

		navigation.navigate('TreasureConfirmScreen', { action, type, product: 'PRODUCT' });
	};

	onIntro = (type) => () => {
		const { navigation } = this.props;

		navigation.navigate(`${_.upperFirst(type)}IntroScreen`);
	};

	render() {
		const { collapsible } = this.props;

		return (
			<ScrollView style={styles.mainContainer} contentContainerStyle={styles.content} {...collapsible}>
				<View style={{ width: '100%' }}>
					<RoundedButton text="Test Gem Intro" onPress={this.onIntro('gem')} />
					<RoundedButton text="Test Key Intro" onPress={this.onIntro('key')} />
					<RoundedButton text="Test Coin Intro" onPress={this.onIntro('coin')} />
					<RoundedButton text="Test Unlock Gem" onPress={this.onTest('unlock', 'gem')} />
					<RoundedButton text="Test Unlock Coin" onPress={this.onTest('unlock', 'coin')} />
					<RoundedButton text="Test Unlock Key" onPress={this.onTest('unlock', 'key')} />
					<RoundedButton text="Test Bid Gem" onPress={this.onTest('bid', 'gem')} />
					<RoundedButton text="Test Bid Coin" onPress={this.onTest('bid', 'coin')} />
				</View>
				{PHOTOS.map((uri) => (
					<View key={uri} style={styles.item}>
						<Image source={{ uri }} style={styles.photo} />
					</View>
				))}
			</ScrollView>
		);
	}
}

export default withCollapsible(HotScreen);
