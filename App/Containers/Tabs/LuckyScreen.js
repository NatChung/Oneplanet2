import React, { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import CountDownClock from '../../Components/CountDownClock'
import BiddingCell from "../../Components/BiddingCell";
import { Images } from "../../Themes"
import Icon from 'react-native-vector-icons/FontAwesome'
import LockGroupButton from "../../Components/LockGroupButton"
// Styles
import styles from './Styles/LuckyScreenStyle';
import withCollapsible from '../../Utils/withCollapsible';

class LuckyScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		data: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
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

	render() {
		const { collapsible } = this.props;

		return (
			<View style={styles.mainContainer}>
				<Image source={Images.loginBackground} style={styles.backgroundImage} />
				<View style={styles.header}>
					<CountDownClock seconds={this.props.countdown} />
					<LockGroupButton selected={this.state.selected} onPress={type => this.setState({selected:type})} />
				</View>
				
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
					{...collapsible}
				/>
			</View>
		);
	}
}

export default withCollapsible(LuckyScreen);
