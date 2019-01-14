import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	header: {
		backgroundColor: '#191919'
	},
	headerTitle: {
		color: Colors.snow
	},
	mainContainer: {
		flex: 1,
		backgroundColor: '#000000'
	},
	termsText: {
		...Fonts.style.normal,
		margin: Metrics.doubleBaseMargin,
		color: Colors.snow
	}
});
