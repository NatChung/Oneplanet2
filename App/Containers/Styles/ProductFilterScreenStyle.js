import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  header: {
		backgroundColor: '#191919'
	},
	headerTitle: {
		color: Colors.snow
	},
	headerLeft: {
		color: 'white',
		fontSize: 17,
		marginLeft: 15
	},
	mainContainer: {
		flex: 1,
		backgroundColor: '#000000'
	},
})
