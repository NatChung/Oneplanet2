import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Images } from '../Themes';
import styles from './Styles/TreasureBarStyle';

export default class TreasureBar extends Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.score}>
					<Image style={styles.scoreBackgroundImage} source={Images.scoreBackground} />
					<Image style={styles.scoreImage} source={Images.score} />
				</View>
				<View style={{ flexDirection: 'row', marginLeft: -14 }}>
					<View style={styles.treasureRow}>
						<View style={styles.gemShadow}>
							<Image source={Images.treasure.gem} />
						</View>
						<Text style={styles.gemText}>000</Text>
					</View>
					<View style={styles.treasureRow}>
						<View style={styles.coinShadow}>
							<Image source={Images.treasure.coin} />
						</View>
						<Text style={styles.coinText}>000</Text>
					</View>
					<View style={styles.treasureRow}>
						<View style={styles.keyShadow}>
							<Image source={Images.treasure.key} />
						</View>
						<Text style={styles.keyText}>000</Text>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}
