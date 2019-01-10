import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
	container:{
		marginHorizontal: 36,
		marginVertical: Metrics.baseMargin,
	},
	inputContainer: {
		height: 45,
		borderRadius: 23,
		
		
		backgroundColor: 'rgba(255,255,255, 0.2)',
		justifyContent: 'center',
	},
	inputText: {
		color: Colors.snow,
		fontSize: Fonts.size.regular,
		paddingLeft: 20,
		paddingRight: 12,
	},
	outline: {
		borderWidth: 1,
		borderColor: 'rgba(255,255,255, 0.5)'
	},
	errorOutLine: {
		borderWidth: 1,
		borderColor: 'red'
	},
	error:{
		color:'red',
		marginLeft: 20,
	}
})
