import { StyleSheet, Platform } from 'react-native';

const majorVersion = parseInt(Platform.Version, 10);
const isIos = Platform.OS === 'ios';
const isIOS11 = majorVersion >= 11 && isIos;

const DEFAULT_HEIGHT = 49;
const COMPACT_HEIGHT = 29;

export default StyleSheet.create({
	tabBar: {
		flexDirection: 'row'
	},
	tabBarCompact: {
		height: COMPACT_HEIGHT
	},
	tabBarRegular: {
		height: DEFAULT_HEIGHT
	},
	tab: {
		flex: 1,
		alignItems: isIos ? 'center' : 'stretch'
	},
	tabPortrait: {
		justifyContent: 'flex-end',
		flexDirection: 'column'
	},
	tabLandscape: {
		justifyContent: 'center',
		flexDirection: 'row'
	},
	iconWithoutLabel: {
		flex: 1
	},
	iconWithLabel: {
		flex: 1
	},
	iconWithExplicitHeight: {
		height: Platform.isPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT
	},
	label: {
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	labelBeneath: {
		fontSize: 11,
		marginBottom: 1.5
	},
	labelBeside: {
		fontSize: 12,
		marginLeft: 15
	},
	backgroundImage: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover',
		width: null
	},
	icon: {
		position: 'absolute',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: '100%',
		width: '100%',
		minWidth: 25
	},

	topTab: {
		flex: 1,
		alignItems: 'center'
	},
	topTabText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
		fontWeight: '500'
	},
	topTabIndicator: {
		position: 'absolute',
		bottom: -6
	}
});

export { isIOS11 };
