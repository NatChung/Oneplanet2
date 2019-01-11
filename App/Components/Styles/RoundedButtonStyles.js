import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
	button: {
		height: 45,
		borderRadius: 23,
		marginHorizontal: 36,
		marginVertical: Metrics.baseMargin,
		backgroundColor: Colors.facebook,
		justifyContent: 'center'
	},
	buttonText: {
		color: Colors.snow,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: Fonts.size.medium
	},
	outline: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: Colors.snow
	},
	disabled: {
		opacity: 0.6,
	}
});
