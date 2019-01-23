import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';

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

	render() {
		const { collapsible } = this.props;

		return (
			<ScrollView style={styles.mainContainer} contentContainerStyle={styles.content} {...collapsible}>
				<View style={{ width: '100%' }}>
					<RoundedButton text="Test unlock gem" onPress={this.onTest('unlock', 'gem')} />
					<RoundedButton text="Test unlock coin" onPress={this.onTest('unlock', 'coin')} />
					<RoundedButton text="Test unlock key" onPress={this.onTest('unlock', 'key')} />
					<RoundedButton text="Test bid gem" onPress={this.onTest('bid', 'gem')} />
					<RoundedButton text="Test bid coin" onPress={this.onTest('bid', 'coin')} />
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
