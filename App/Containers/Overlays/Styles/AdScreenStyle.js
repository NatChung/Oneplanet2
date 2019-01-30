import { StyleSheet, Dimensions } from 'react-native';
import { ApplicationStyles } from '../../../Themes';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	mainContainer: {
		flex: 1
	},
	alienImage: {
		alignSelf: 'center',
		marginTop: 58
	},
	body: {
		zIndex: -1,
		flex: 1,
		marginTop: -25,
		marginBottom: -12,
		justifyContent: 'center',
		backgroundColor: '#EF3538'
	},
	adImage: {
		height: Dimensions.get('window').width
	},
	button: {
		backgroundColor: '#5FD2CE',
		marginVertical: 0,
		shadowOpacity: 0.5,
		shadowColor: '#000000',
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2 },
		elevation: 1
	},
	checkbox: {
		marginVertical: 16
	},
	cancelButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		position: 'absolute',
		top: 20,
		left: 20
	}
});
