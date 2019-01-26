import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Image, Text, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Images } from '../Themes';
import styles from './Styles/TreasureBarStyle';

export default class TreasureBar extends Component {
	state = {
		animator: {
			score: new Animated.Value(0),
			gem: new Animated.Value(0),
			coin: new Animated.Value(0),
			key: new Animated.Value(0)
		},
		activeTreasure: undefined
	};

	treasureStyles = {
		gem: { shadow: styles.gemShadow, text: styles.gemText },
		coin: { shadow: styles.coinShadow, text: styles.coinText },
		key: { shadow: styles.keyShadow, text: styles.keyText }
	};

	animate = (value, config) => {
		return new Promise((resolve) => {
			Animated.timing(value, { ...config }).start(resolve);
		});
	};

	animateTreasure = async (type) => {
		const { animator } = this.state;

		this.setState({ activeTreasure: type });
		animator[type].setValue(0);
		await this.animate(animator[type], { duration: 1000, toValue: 1 });
		this.setState({ activeTreasure: undefined });
	};

	test = async () => {
		const { animator } = this.state;
		// const currValue = scoreWidth._value;

		animator.score.setValue(0);
		await this.animate(animator.score, { duration: 1000, toValue: 1 });

		await this.animateTreasure('gem');
		await this.animateTreasure('coin');
		await this.animateTreasure('key');
	};

	onGem = this.test; // () => this.props.navigation.navigate('GemIntroScreen');

	onCoin = () => this.props.navigation.navigate('CoinIntroScreen');

	onKey = () => this.props.navigation.navigate('KeyIntroScreen');

	renderTreasure = (type) => {
		const { animator } = this.state;

		const opacity = animator[type].interpolate({ inputRange: [ 0, 0.9, 0.95, 1 ], outputRange: [ 1, 0, 0, 1 ] });
		const scale = animator[type].interpolate({ inputRange: [ 0, 0.9, 0.95, 1 ], outputRange: [ 1, 50, 0, 1 ] });
		const treasureImageStyle = [ { opacity, transform: [ { scaleX: scale }, { scaleY: scale } ] } ];

		return (
			<View style={styles.row}>
				<View style={this.treasureStyles[type].shadow}>
					<Animated.Image style={treasureImageStyle} source={Images.treasure[type]} />
				</View>
				<Text style={this.treasureStyles[type].text}>0000</Text>
			</View>
		);
	};

	render() {
		const { animator, activeTreasure } = this.state;

		const activeTreasureStyle = (type) => (activeTreasure === type ? styles.activeTreasure : null);
		const scoreAnimationWidth = animator.score.interpolate({ inputRange: [ 0, 1 ], outputRange: [ '0%', '100%' ] });
		const scoreAnimationStyle = [ styles.scoreAnimation, { width: scoreAnimationWidth } ];

		return (
			<SafeAreaView style={[ this.props.style, styles.container ]}>
				<TouchableOpacity style={activeTreasureStyle('gem')} onPress={this.onGem}>
					<View style={styles.row}>
						<View style={styles.score}>
							<Image style={styles.scoreBackgroundImage} source={Images.scoreBackground} />
							<Animated.View style={scoreAnimationStyle}>
								<Image style={styles.scoreImage} source={Images.score} />
							</Animated.View>
						</View>
						<View style={styles.gemWrapper}>{this.renderTreasure('gem')}</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={activeTreasureStyle('coin')} onPress={this.onCoin}>
					{this.renderTreasure('coin')}
				</TouchableOpacity>
				<TouchableOpacity style={activeTreasureStyle('key')} onPress={this.onKey}>
					{this.renderTreasure('key')}
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
