import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Pages } from 'react-native-pages';

// Styles
import styles from './Styles/ProductDetailScreenStyle';

class ProductDetailScreen extends Component {
	static navigationOptions = {
		headerForceInset: { top: 'never' }
	};

	render() {
		return (
			<View style={styles.container}>
				<Pages>
					<Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.adImage} />
					<Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.adImage} />
				</Pages>
			</View>
		);
	}
}

export default ProductDetailScreen;
