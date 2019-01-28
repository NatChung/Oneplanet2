import React, { Component } from 'react';
import { FlatList, View, Image } from 'react-native';
import { Pages } from 'react-native-pages';
import _ from 'lodash';

// Styles
import styles from './Styles/HotScreenStyle';
import { Images } from '../../Themes';
import withCollapsible from '../../Utils/withCollapsible';

const URL = 'https://unsplash.it';
const PRODUCTS = Array.from({ length: 24 }).map((_, i) => `${URL}/300/300?random&__id=${'product'}${i}`);
const BANNERS = Array.from({ length: 10 }).map((_, i) => `${URL}/363/161?random&__id=${'banners'}${i}`);

class HotScreen extends Component {
	static navigationOptions = {};

	state = {};

	renderBannerItem = (banner, i) => {
		const { imgUrl: uri } = banner;
		return <Image key={i} style={styles.bannerImage} source={{ uri }} />;
	};

	renderBanners = () => {
		const banners = BANNERS.map((uri) => ({ imgUrl: uri }));

		return (
			<View style={styles.banners}>
				<Pages>{banners.map(this.renderBannerItem)}</Pages>
			</View>
		);
	};

	renderProductItem = ({ item: product }) => {
		const { imgUrl: uri } = product;
		return (
			<View style={styles.product}>
				<Image source={{ uri }} style={styles.productImage} />
			</View>
		);
	};

	renderProducts = () => {
		const { collapsible } = this.props;

		const products = PRODUCTS.map((uri) => ({ imgUrl: uri }));

		return (
			<FlatList
				data={products}
				contentContainerStyle={styles.products}
				{...collapsible}
				renderItem={this.renderProductItem}
				numColumns={2}
				keyExtractor={(_, index) => index}
			/>
		);
	};

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				{this.renderBanners()}
				{this.renderProducts()}
			</View>
		);
	}
}

export default withCollapsible(HotScreen);
