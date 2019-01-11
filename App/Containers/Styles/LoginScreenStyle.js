import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/';

const BaseStyles = StyleSheet.create({
	tips: {
		fontSize: Fonts.size.small,
		color: Colors.snow
	}
});

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
	emailTips: {
		...BaseStyles.tips,
		alignSelf: 'center'
	},
	passwordTips: {
		...BaseStyles.tips,
		alignSelf: 'flex-end'
	},
	textInputContainer: {
		marginVertical: 0,
		marginHorizontal: 0
	},
	inputGroupContainer: {
		flex: 2.7
	},
	inputGroup: {
		marginHorizontal: 36,
		marginBottom: 10
	},
	loginButton: {
		marginTop: 26,
		backgroundColor: '#5FD2CE'
	}
});
