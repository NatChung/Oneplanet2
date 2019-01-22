import React, { Component } from 'react';
import { View, Image, FlatList, Text } from 'react-native';
import CountDownClock from '../../Components/CountDownClock';
import BiddingCell from '../../Components/BiddingCell';
import { Images } from '../../Themes';
import { v4 as uuid } from 'uuid';
// Styles
import styles from './Styles/LuckyScreenStyle';
import withCollapsible from '../../Utils/withCollapsible';

class LuckyScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		data: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
	};

	renderHeader = () => <View style={styles.filterHeader} />;

	renderItem = ({ item }) => (
		<View>
			<Image />
			<Text>Content text</Text>
			<View>
				<Image />
				<Text>Lock</Text>
			</View>
		</View>
	);

	render() {
		const { collapsible } = this.props;

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
					{...collapsible}
				/>
			</View>
		);
	}
}

export default withCollapsible(LuckyScreen);
