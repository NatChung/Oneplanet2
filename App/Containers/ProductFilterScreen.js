import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, Button } from 'react-native';
import I18n from '../I18n';

// Styles
import styles from './Styles/ProductFilterScreenStyle';
import FilterCell from '../Components/FilterCell';

const renderHeaderLeft = (navigation) => (
	<TouchableOpacity onPress={() => navigation.goBack()}>
		<Text style={styles.headerLeft}>{I18n.t('cancel')}</Text>
	</TouchableOpacity>
);

class ProductFilterScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: I18n.t('filter'),
		header: undefined,
		headerStyle: styles.header,
		headerTitleStyle: styles.headerTitle,
		headerLeft: renderHeaderLeft(navigation),
		headerRight: <Button title={I18n.t('done')} onPress={() => navigation.goBack()} />
	});

	state = {
		data: [ { key: 'a', selected: false }, { key: 'b', selected: true } ]
	};

	onItemPress = ({ item, index }) => {
		const data = [ ...this.state.data ].map((item, i) => {
			item.selected = i === index;
			return item;
		});

		this.setState({ data });
	};

	cellProps = ({ item, index }) => ({
		item,
		index,
		onPress: this.onItemPress
	});

	render() {
		return (
			<View style={styles.mainContainer}>
				<FlatList
					data={this.state.data}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item, index }) => <FilterCell {...this.cellProps({ item, index })} />}
				/>
			</View>
		);
	}
}

export default ProductFilterScreen;
