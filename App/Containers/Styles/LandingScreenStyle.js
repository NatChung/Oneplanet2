import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/';

const BaseStyles = StyleSheet.create({
	text: {
		alignSelf: 'center',
		color: Colors.snow,
		fontSize: Fonts.size.small
	}
});

export default StyleSheet.create({
	...ApplicationStyles.screen,
	fullScreen: StyleSheet.absoluteFill,
	muteToggle: {
		position: 'absolute',
		top: 54,
		right: 16,
		paddingVertical: 12,
		paddingHorizontal: 10.5
	},
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	logo: {
		marginTop: 92,
		width: Metrics.images.logoText,
		resizeMode: 'contain'
	},
	centered: {
		alignItems: 'center'
	},
	button: {
		backgroundColor: Colors.snow,
		marginVertical: 8
	},
	buttonText: {
		color: '#000000'
	},
	text: {
		...BaseStyles.text,
		marginVertical: 8
	},
	buttonSignUp: {
		backgroundColor: '#5FD2CE'
	},
	termsText: {
		...BaseStyles.text,
		marginTop: 12,
		marginBottom: 54
	},
	underline: {
		fontWeight: '500',
		textDecorationLine: 'underline'
	}
});
