import { StyleSheet, Dimensions } from 'react-native';
import { ApplicationStyles } from '../../../Themes';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	products: {
		paddingHorizontal: 3.5
	},
	product: {
		flex: 1,
		height: Dimensions.get('window').width / 2 - 8.5,
		marginHorizontal: 2.5,
		marginBottom: 6
	},
	productImage: {
		flex: 1
	},
	banners: {
		height: 161,
		marginVertical: 6,
		paddingHorizontal: 6
	},
	bannerImage: {
		flex: 1
	}
});
