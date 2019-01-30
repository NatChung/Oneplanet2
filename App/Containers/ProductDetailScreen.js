import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Pages } from 'react-native-pages';
import _ from 'lodash';
import { Images } from '../Themes';
import LockerButton from '../Components/LockerButton';

// Styles
import styles from './Styles/ProductDetailScreenStyle';

class ProductDetailScreen extends Component {
	static navigationOptions = {
		headerForceInset: { top: 'never' }
	};

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.pageContainer}>
					<Pages>
						{_.times(2).map((_, i) => (
							<View key={i} style={styles.mainContainer}>
								<Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.adImage} />
							</View>
						))}
					</Pages>
					<LockerButton style={styles.LockerContainer} />
				</View>

				<ScrollView style={styles.contentContainer}>
					<Text style={styles.title}>Title Title Title Title</Text>
					<Text style={styles.content}>Content Content Content Content Content Content</Text>
				</ScrollView>
			</View>
		);
	}
}

export default ProductDetailScreen;
