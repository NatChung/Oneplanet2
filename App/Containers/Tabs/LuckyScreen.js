import React, { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';
import CountDownClock from '../../Components/CountDownClock'
import BiddingCell from "../../Components/BiddingCell";
import { Images } from "../../Themes"
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './Styles/LuckyScreenStyle';

class LuckyScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		data: [ 3, 3, 3, 3, 3, 3, 3 ]
	};

	onFilter = () => this.props.navigation.navigate('ProductFilterScreen')

	renderHeader = () => (
	<View style={styles.filterHeader}>
		<TouchableOpacity onPress={this.onFilter} style={styles.filterTouchable}>
			<Text style={styles.filterTitle}>All</Text>
			<Icon style={styles.filterIcon} name='angle-down' size={20} color='white'/>
		</TouchableOpacity>
	</View>)

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<CountDownClock seconds={this.props.countdown} />
				<FlatList
					style={styles.listContaner}
					data={this.state.data}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => (
						<BiddingCell
							item={item}
							onPress={() => this.props.navigation.navigate('ProductDetailScreen')}
						/>
					)}
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
				/>
			</View>
		);
	}
}

export default LuckyScreen;
