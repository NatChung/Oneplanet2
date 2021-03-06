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
		width: Metrics.images.medium,
		height: Metrics.images.medium,
		justifyContent: 'center',
		alignItems: 'center'
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
		backgroundColor: Colors.oneplanet.button
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
