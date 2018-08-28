import React from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
//
import { fetchCityTemp } from '../services/weatherAPI';
import { CITIES } from '../utils/constants';
import { getRandomFromArray } from '../utils/functions';
import styles from './HomeScreenStyles';


class HomeScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      return <Ionicons name="ios-home-outline" size={25} color={tintColor} />;
    }
  });
  constructor() {
    super();
    this.state = {
      list: [],
      refreshing: false,
    }
  }
  componentDidMount() {
    this.getCitiesTemp();
  }

  getCitiesTemp = async () => {
    this.setState({
      refreshing: true,
    })
    const cities = getRandomFromArray(CITIES, 5);
    const citiesPromise = cities.map(this.getCityTemp);
    const citiesData = await Promise.all(citiesPromise);
    this.setState({
      list: citiesData,
      refreshing: false
    });
  };

  getCityTemp = async city => {
    try {
      const res = await fetchCityTemp(city.name, city.country);
      const data = await res.json();
      return {
        name: data.name,
        country: data.sys.country,
        temp: Math.ceil(data.main.temp),
        type: data.weather[0].main,
      }
    } catch (err) {
      return null
    }
  };

  getTempStyle = t => {
    if(t < 11) {
      return 'cold'
    }
    else  if(t < 10 && t < 20) {
      return 'medium';
    }
    else if(t >= 20 && t < 30) {
      return 'hot';
    } else {
      return 'vhot';
    }
  };
  onItemPress = item => {
    alert(`
    ${item.name}
    ${item.temp}C
    `)
  }
  _renderItem = ({ item, info }) => {
    const tempColor = this.getTempStyle(item.temp);
    return (
      <TouchableOpacity onPress={() => this.onItemPress(item)}>
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
          style={{ }}>
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.temp, styles[tempColor]]}>{item.temp}C</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  };
  render() {
    const { list, refreshing } = this.state;
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.title}>Home Screen</Text>
        <FlatList
          data={list}
          // refreshing={refreshing}
          // onRefresh={this.getCitiesTemp}
          keyExtractor={({ item, index }) => `city_${index}`}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.getCitiesTemp}
              // title="Pull to refresh"
              colors={['#00f00f', '#ff0ff0']}
            />
          }
        />
      </View>
    )
  }
}

export default HomeScreen;
