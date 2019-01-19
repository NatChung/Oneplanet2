import { StyleSheet, Dimensions } from 'react-native';
import { ApplicationStyles } from '../../../Themes';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	content: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 4
	},
	item: {
		height: Dimensions.get('window').width / 2,
		width: '50%',
		padding: 4
	},
	photo: {
		flex: 1,
		resizeMode: 'cover'
	}
});
