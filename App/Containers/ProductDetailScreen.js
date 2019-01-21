import React, { Component } from 'react'
import { View, Text, ScrollView, Image , TouchableOpacity} from 'react-native'
import { Pages } from 'react-native-pages'
import { Images } from "../Themes";

// Styles
import styles from './Styles/ProductDetailScreenStyle'

class ProductDetailScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.loginBackground} style={styles.backgroundImage} />
        <View style={styles.pageContainer}>
          <Pages >
            <Image source={{uri:'https://via.placeholder.com/200'}} style={styles.adImage}/>
            <Image source={{uri:'https://via.placeholder.com/200'}} style={styles.adImage}/>
          </Pages>
          <TouchableOpacity style={styles.LockerContainer}>
            <Image source={Images.lucky.lock.off} />
            <Text style={styles.lockerTitle}>Lock</Text>
          </TouchableOpacity>
          
        </View>
        
        <ScrollView style={styles.contentContainer} >
          <Text style={styles.title}>Title Title Title Title</Text>
          <Text style={styles.content}>Content Content Content Content  Content Content</Text>
        </ScrollView>
      </View>
    )
  }
}

export default ProductDetailScreen
