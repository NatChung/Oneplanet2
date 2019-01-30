import React, { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import CountDownClock from '../../Components/CountDownClock'
import BiddingCell from "../../Components/BiddingCell";
import { Images } from "../../Themes"
import Icon from 'react-native-vector-icons/FontAwesome'
import LockGroupButton from "../../Components/LockGroupButton"
import I18n from "../../I18n"
// Styles
import styles from './Styles/LuckyScreenStyle';
import withCollapsible from '../../Utils/withCollapsible';

class LuckyScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		data: [ {
			image: 'https://via.placeholder.com/60',
			title:'Brooklhyn Box Logo Tee',
			locked: true,
			category: 'Other'

		},{
			image: 'https://via.placeholder.com/60',
			title:'Supreme/Heliraiser Hell on Eath Hooded Sweatshirt',
			locked: true,
			category:'Supreme'
		},{
			image: 'https://via.placeholder.com/60',
			title: 'Air tickets Air Tickets Air Tickets Air Tickets',
			locked: false,
			category: 'Other'
		}, {
			image: 'https://via.placeholder.com/60',
			title:'Brooklhyn Box Logo Tee',
			locked: true,
			category: 'Other'
		},{
			image: 'https://via.placeholder.com/60',
			title:'Supreme/Heliraiser Hell on Eath Hooded Sweatshirt',
			locked: false,
			category:'Supreme'
		},{
			image: 'https://via.placeholder.com/60',
			title: 'Air tickets Air Tickets Air Tickets Air Tickets',
			locked: true,
			category:'Other'
		}],
		selected:'left'
	};

	onFilter = () => this.props.navigation.navigate('ProductFilterScreen')

	renderHeader = () => (
	<View style={styles.filterHeader}>
		<TouchableOpacity onPress={this.onFilter} style={styles.filterTouchable}>
			<Text style={styles.filterTitle}>All</Text>
			<Icon style={styles.filterIcon} name='angle-down' size={20} color='white'/>
		</TouchableOpacity>
	</View>)

	unlock = index => {
		const data = [...this.state.data]
		data[index].locked = false
		this.setState(data)
		console.tron.log(data)
	}

	render() {
		const { collapsible } = this.props;

		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.header}>
					<CountDownClock seconds={this.props.countdown} bottomTitle={I18n.t('countdownToBidding')} />
					<LockGroupButton selected={this.state.selected} onPress={type => this.setState({selected:type})} />
				</View>
				
				{this.renderHeader()}
				<FlatList
					style={styles.listContaner}
					data={this.state.data}
					extraData={this.state}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item, index }) => (
						<BiddingCell
							index={index}
							item={item}
							onPress={() => this.props.navigation.navigate('ProductDetailScreen')}
							onLockPress={this.unlock}
						/>
					)}
					{...collapsible}
				/>
			</View>
		);
	}
}

export default withCollapsible(LuckyScreen);
