import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

// Styles
import styles from './Styles/AdScreenStyle';
import I18n from '../../I18n';
import withPopup from '../../Utils/withPopup';
import { Images } from '../../Themes';
import RoundedButton from '../../Components/RoundedButton';
import CheckBox from '../../Components/CheckBox';

class AdScreen extends Component {
	state = {
		imgUrl: this.props.navigation.getParam('imgUrl'),
		notShowToday: false
	};

	buttonStyle = {
		style: styles.button,
		text: I18n.t('前往')
	};

	checkboxStyle = {
		style: styles.checkbox,
		text: I18n.t('今天不再顯示')
	};

	onGo = () => this.props.close();

	onCancel = () => this.props.close();

	onToggleShowToday = () => {
		const { notShowToday } = this.state;
		this.setState({ notShowToday: !notShowToday });
	};

	render() {
		const { imgUrl: uri, notShowToday } = this.state;

		return (
			<SafeAreaView style={styles.mainContainer} forceInset={{ top: 'never' }}>
				<Image style={styles.alienImage} source={Images.ad.alien} />
				<View style={styles.body}>
					<Image style={styles.adImage} source={{ uri }} />
				</View>
				<RoundedButton {...this.buttonStyle} onPress={this.onGo} />
				<CheckBox {...this.checkboxStyle} checked={notShowToday} onPress={this.onToggleShowToday} />
				<TouchableOpacity style={styles.cancelButton} onPress={this.onCancel}>
					<Image source={Images.icons.cancelPopup} />
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

export default withPopup(AdScreen);
