import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		paddingBottom: 35
	},
	tutorialImage: {
		flex: 1,
		width: null,
		resizeMode: 'cover'
	},
	skip: {
		width: 76,
		height: 26,
		marginHorizontal: 20,
		marginVertical: 20,
		alignSelf: 'flex-end'
	}
});
