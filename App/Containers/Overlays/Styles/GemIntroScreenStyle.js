import { StyleSheet } from 'react-native';
import { Colors, ApplicationStyles } from '../../../Themes';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	mainContainer: {
		overflow: 'hidden',
		opacity: 0.95,
		borderRadius: 8,
		marginHorizontal: 20,
		backgroundColor: Colors.snow
	},
	header: {
		paddingTop: 20,
		alignItems: 'center'
	},
	titleText: {
		textAlign: 'center',
		fontSize: 17
	},
	treasureImage: {
		width: 80,
		height: 80
	},
	descriptionText: {
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 17,
		marginBottom: 3
	},
	button: {
		backgroundColor: '#5FD2CE',
		marginHorizontal: 20,
		marginVertical: 0,
		marginBottom: 20
	},
	body: {
		marginHorizontal: 10,
		marginTop: 10,
		marginBottom: 37
	},
	highlightText: {
		fontWeight: 'bold',
		color: '#5FD2CE'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginVertical: 3
	},
	bullet: {
		width: 10,
		marginLeft: 10,
		marginRight: 13
	},
	bulletText: {
		fontSize: 12,
		lineHeight: 17,
		flex: 1
	},
	cancelButton: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 12,
		left: 2,
		padding: 12
	}
});
