import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
	container: {
		marginHorizontal: 36,
		marginVertical: Metrics.baseMargin,
		borderRadius: 23,
		backgroundColor: 'rgba(255,255,255, 0.2)',
		justifyContent: 'center'
	},
	inputText: {
		height: 45,
		color: Colors.snow,
		fontSize: Fonts.size.regular,
		paddingLeft: 20,
		paddingRight: 12
	},
	outline: {
		borderWidth: 0.5,
		borderColor: Colors.snow
	},
	errorOutLine: {
		borderWidth: 0.5,
		borderColor: 'red'
	},
	error: {
		color: 'red',
		marginLeft: 20
	}
});
