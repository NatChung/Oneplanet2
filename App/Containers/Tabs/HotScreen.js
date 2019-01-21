import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';

// Styles
import styles from './Styles/HotScreenStyle';
import withCollapsible from '../../Utils/withCollapsible';

const URL = 'https://unsplash.it/300/300/';
const PHOTOS = Array.from({ length: 24 }).map((_, i) => `${URL}?random&__id=${+new Date()}${i}`);

class HotScreen extends Component {
	static navigationOptions = {};

	state = {};

	render() {
		const { collapsible } = this.props;

		return (
			<ScrollView style={styles.mainContainer} contentContainerStyle={styles.content} {...collapsible}>
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
