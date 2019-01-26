import { StyleSheet } from 'react-native';

const BaseStyles = StyleSheet.create({
	treasureText: {
		width: 32,
		textAlign: 'center',
		marginLeft: 6,
		marginRight: 12,
		fontSize: 12,
		fontWeight: 'bold'
	},
	treasureShadow: {
		zIndex: 1
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
	scoreAnimation: {
		...StyleSheet.absoluteFillObject,
		left: 2,
		borderRadius: 5,
		overflow: 'hidden'
	},
	scoreImage: {
		resizeMode: 'contain',
		height: '100%'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	gemWrapper: {
		marginLeft: -14
	},
	gemText: {
		...BaseStyles.treasureText,
		color: '#009BDC'
	},
	gemShadow: {
		...BaseStyles.treasureShadow,
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
		...BaseStyles.treasureShadow,
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
		...BaseStyles.treasureShadow,
		shadowOpacity: 1,
		shadowColor: '#7ED321',
		shadowRadius: 15,
		shadowOffset: { width: 0, height: 0 }
	},
	activeTreasure: {
		zIndex: 2
	}
});
