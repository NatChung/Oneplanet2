import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	socailMediaContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingBottom: 35
	},
	text: {
		...Fonts.style.description,
		color: Colors.snow,
		textAlign: 'center',
		marginVertical: 5
	},
	inputGroupContainer: {
		flex: 2.7
	},
	loginButton: {
		marginTop: 30,
		backgroundColor: '#5FD2CE'
	}
});
