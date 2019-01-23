import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Image, Text } from 'react-native';

// Styles
import styles from './Styles/OverlayScreenStyle';
import RoundedButton from '../Components/RoundedButton';
import { Images } from '../Themes';

const { height } = Dimensions.get('window');

class OverlayScreen extends Component {
	state = {
		translateY: new Animated.Value(height)
	};

	componentDidMount() {
		this.animate(this.state.translateY, { duration: 250, toValue: 0 });
	}

	animate = (value, config) => {
		return new Promise((resolve) => Animated.timing(value, config).start(resolve));
	};

	onClose = () => {
		this.animate(this.state.translateY, { duration: 250, toValue: height });
		this.props.navigation.goBack();
	};

	render() {
		const { translateY } = this.state;

		return (
			<View style={styles.mainContainer}>
				<Animated.View style={[ styles.container, { transform: [ { translateY } ] } ]}>
					<View style={styles.wrapper}>
						<View style={styles.header}>
							<Image source={Images.product.gem} style={styles.productImage} />
						</View>
						<Text style={styles.titleText}>
							Unlock <Text style={[ styles.titleText, styles.productText ]}>ProductName</Text> ?
						</Text>
						<Text style={styles.descriptionText}>確定使用一顆解鎖寶？</Text>
						<View style={styles.footer}>
							<RoundedButton style={styles.okButton} text="OK" onPress={this.onClose} />
							<RoundedButton
								outline
								style={styles.cancelButton}
								textStyle={styles.cancelText}
								text="Cancel"
								onPress={this.onClose}
							/>
						</View>
					</View>
				</Animated.View>
			</View>
		);
	}
}

export default OverlayScreen;
