import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
	checkbox: {
		alignSelf: 'center',
		margin: 0,
		padding: 0,
		borderWidth: 0,
		backgroundColor: Colors.transparent
	},
	checkboxText: {
		color: Colors.snow,
		fontSize: Fonts.size.small,
		marginLeft: 6,
		marginRight: 0
	}
});
