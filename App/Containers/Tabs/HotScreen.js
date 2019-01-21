import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';

// Styles
import styles from './Styles/HotScreenStyle';

const PHOTOS = Array.from({ length: 24 }).map((_, i) => `https://unsplash.it/300/300/?random&__id=${'hot'}${i}`);

class HotScreen extends Component {
	static navigationOptions = {};

	render() {
		return (
			<ScrollView style={styles.mainContainer} contentContainerStyle={styles.content}>
				{PHOTOS.map((uri) => (
					<View key={uri} style={styles.item}>
						<Image source={{ uri }} style={styles.photo} />
					</View>
				))}
			</ScrollView>
		);
	}
}

export default HotScreen;
