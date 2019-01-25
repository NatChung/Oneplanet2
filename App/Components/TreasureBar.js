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
		}
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

	test = async () => {
		const { animator } = this.state;
		// const currValue = scoreWidth._value;

		animator.score.setValue(0);
		await this.animate(animator.score, { duration: 1000, toValue: 1 });

		animator.gem.setValue(0);
		await this.animate(animator.gem, { duration: 1000, toValue: 1 });

		animator.coin.setValue(0);
		await this.animate(animator.coin, { duration: 1000, toValue: 1 });

		animator.key.setValue(0);
		await this.animate(animator.key, { duration: 1000, toValue: 1 });
	};

	onGem = this.test;

	// onGem = () => this.props.navigation.navigate('GemIntroScreen');

	onCoin = () => this.props.navigation.navigate('CoinIntroScreen');

	onKey = () => this.props.navigation.navigate('KeyIntroScreen');

	renderTreasure = (type) => {
		const { animator } = this.state;

		const opacity = animator[type].interpolate({ inputRange: [ 0, 0.9, 0.95, 1 ], outputRange: [ 1, 0, 0, 1 ] });
		const scale = animator[type].interpolate({ inputRange: [ 0, 0.9, 0.95, 1 ], outputRange: [ 1, 50, 0, 1 ] });
		const treasureImageStyles = { opacity, transform: [ { scaleX: scale }, { scaleY: scale } ] };

		return (
			<View style={styles.row}>
				<View style={this.treasureStyles[type].shadow}>
					<Animated.Image style={treasureImageStyles} source={Images.treasure[type]} />
				</View>
				<Text style={this.treasureStyles[type].text}>000</Text>
			</View>
		);
	};

	render() {
		const { animator } = this.state;

		const scoreWidth = animator.score.interpolate({ inputRange: [ 0, 1 ], outputRange: [ '0%', '100%' ] });
		const scoreStyle = [ styles.scoreImage, { width: scoreWidth } ];

		return (
			<SafeAreaView style={styles.container}>
				<TouchableOpacity style={styles.row} onPress={this.onGem}>
					<View style={styles.score}>
						<Image style={styles.scoreBackgroundImage} source={Images.scoreBackground} />
						<Animated.Image style={scoreStyle} source={Images.score} />
					</View>
					<View style={styles.gemWrapper}>{this.renderTreasure('gem')}</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.onCoin}>{this.renderTreasure('coin')}</TouchableOpacity>
				<TouchableOpacity onPress={this.onKey}>{this.renderTreasure('key')}</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
