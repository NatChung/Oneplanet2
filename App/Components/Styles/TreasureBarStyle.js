import { StyleSheet, Dimensions } from 'react-native';

const BaseStyles = StyleSheet.create({
	treasureText: {
		width: 32,
		textAlign: 'center',
		marginLeft: 6,
		fontSize: 12,
		fontWeight: 'bold'
	},
	treasureShadow: {
		zIndex: 1,
		shadowOpacity: 1,
		shadowRadius: 7.5,
		shadowOffset: { width: 0, height: 0 }
	}
});

export default StyleSheet.create({
	container: {
		height: 28,
		backgroundColor: '#191919',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 12
	},
	score: {
		shadowOpacity: 1,
		shadowColor: '#5FD2CE',
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 0 }
	},
	scoreBackgroundImage: {
		width: Dimensions.get('window').width > 320 ? 143 : 88,
		resizeMode: 'stretch'
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
		shadowColor: '#009BDC'
	},
	coinText: {
		...BaseStyles.treasureText,
		color: '#BD10E0'
	},
	coinShadow: {
		...BaseStyles.treasureShadow,
		shadowColor: '#BD10E0'
	},
	keyText: {
		...BaseStyles.treasureText,
		color: '#7ED321'
	},
	keyShadow: {
		...BaseStyles.treasureShadow,
		shadowColor: '#7ED321'
	},
	activeTreasure: {
		zIndex: 2
	}
});
