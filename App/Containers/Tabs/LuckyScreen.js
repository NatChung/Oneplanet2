import React, { Component } from 'react';
import { View, Image, FlatList, Text} from 'react-native';
import { bottomTabBarIcon } from '../../Components/TabBar';
import CountDownClock from '../../Components/CountDownClock'
import BiddingCell from "../../Components/BiddingCell";
import { Images } from "../../Themes"
import { v4 as uuid } from "uuid"
// Styles
import styles from './Styles/LuckyScreenStyle';

class LuckyScreen extends Component {
	static navigationOptions = {
		tabBarIcon: bottomTabBarIcon('lucky')
	}

	state = {
		data: [3,3,3,3,3,3,3]
	}

	

	renderHeader = () => (<View style={styles.filterHeader}/>)

	renderItem = ({item}) => (
	<View>
		<Image />
		<Text>Content text</Text>
		<View>
			<Image />
			<Text>Lock</Text> 
		</View>
	</View>)

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<CountDownClock seconds={this.props.countdown} />
				<FlatList style={styles.listContaner}
					data={this.state.data}
					keyExtractor={(_,index) => index.toString()}
					renderItem={({item}) => <BiddingCell item={item} onPress={() => this.props.navigation.navigate('ProductDetailScreen')}/>}
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[0]}
					/>
			</View>
		);
	}
}

export default LuckyScreen;
