import { StyleSheet } from 'react-native';
import { Colors, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	mainContainer: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	wrapper: {
		overflow: 'hidden',
		opacity: 0.95,
		borderRadius: 8,
		marginHorizontal: 20,
		backgroundColor: Colors.snow
	},
	header: {
		backgroundColor: '#DBDBDC',
		borderBottomColor: Colors.snow,
		borderBottomWidth: 0.5,
		paddingVertical: 26,
		alignItems: 'center'
	},
	footer: {
		paddingVertical: 17
	},
	productImage: {
		width: 80,
		height: 80
	},
	titleText: {
		textAlign: 'center',
		fontSize: 17,
		marginTop: 10
	},
	productText: {
		fontWeight: 'bold'
	},
	descriptionText: {
		textAlign: 'center',
		fontSize: 12,
		marginTop: 6
	},
	okButton: {
		backgroundColor: '#5FD2CE',
		marginHorizontal: 20,
		marginVertical: 3
	},
	cancelButton: {
		borderColor: '#4A4A4A',
		marginHorizontal: 20,
		marginVertical: 3
	},
	cancelText: {
		color: '#4A4A4A'
	}
});
