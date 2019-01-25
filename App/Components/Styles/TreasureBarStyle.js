import { StyleSheet } from 'react-native';

const BaseStyles = StyleSheet.create({
	treasureText: {
		width: 31,
		textAlign: 'center',
		marginLeft: 6,
		marginRight: 13,
		fontSize: 16,
		fontWeight: 'bold'
	}
});

export default StyleSheet.create({
	container: {
		height: 28,
		backgroundColor: '#191919',
		flexDirection: 'row',
		alignItems: 'center'
	},
	score: {
		marginLeft: 12,
		shadowOpacity: 1,
		shadowColor: '#5FD2CE',
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 0 }
	},
	scoreBackgroundImage: {
		width: 143
	},
	scoreImage: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'stretch',
		top: -0.5,
		left: 1
	},
	treasureRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	gemText: {
		...BaseStyles.treasureText,
		color: '#009BDC'
	},
	gemShadow: {
		shadowOpacity: 1,
		shadowColor: '#009BDC',
		shadowRadius: 15,
		shadowOffset: { width: 0, height: 0 }
	},
	coinText: {
		...BaseStyles.treasureText,
		color: '#BD10E0'
	},
	coinShadow: {
		shadowOpacity: 1,
		shadowColor: '#BD10E0',
		shadowRadius: 15,
		shadowOffset: { width: 0, height: 0 }
	},
	keyText: {
		...BaseStyles.treasureText,
		color: '#7ED321'
	},
	keyShadow: {
		shadowOpacity: 1,
		shadowColor: '#7ED321',
		shadowRadius: 15,
		shadowOffset: { width: 0, height: 0 }
	}
});
