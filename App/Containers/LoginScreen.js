import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { Images } from '../Themes';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';
import RoundedButton from '../Components/RoundedButton';

class LoginScreen extends Component {
	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.container}>
					<Text>LoginScreen</Text>
				</View>
			</View>
		);
	}
}

export default LoginScreen;
