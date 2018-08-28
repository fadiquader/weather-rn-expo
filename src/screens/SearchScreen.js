import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
//
import { fetchCityTemp } from '../services/weatherAPI';
import styles from './SearchScreenStyles';

class SearchScreen extends React.Component{
  static navigationOptions =  ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      return <Ionicons name="ios-search" size={25} color={tintColor} />;
    }
  });
  constructor() {
    super();
    this.state = {
      searchInput: '',
      searchResult: null,
      error: '',
      loading: false,
    }
  }

  onChangeText = text => {
    this.setState({
      searchInput: text,
    })
  };

  onSearch = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
      searchResult: null,
      error: '',
    });
    try {
      const res = await fetchCityTemp(searchInput);
      const data = await res.json();
      if(data.cod === 400) throw new Error();
      this.setState({
        loading: false,
        searchResult: {
          name: data.name,
          country: data.sys.country,
          temp: Math.ceil(data.main.temp),
          type: data.weather[0].main,
        }
      })
    } catch (err) {
      this.setState({
        error: 'City not found.',
        loading: false,
      })
    }
  };

  _renderContent = () => {
    const { searchResult, loading, error } = this.state;
    if(error) {
      return (
        <View>
          <Text>{error}</Text>
        </View>
      )
    }
    else if(loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      )
    } else if(searchResult) {
      return (
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}
          style={styles.searchResult}
        >
          <View>
            <Text>{searchResult.name}</Text>
            <Text>{searchResult.country}</Text>
            <Text>{searchResult.temp}C</Text>
            <Text>{searchResult.type}</Text>
          </View>
        </LinearGradient>
      )
    } else {
      return (
        <View style={styles.searchPlaceholder}>
          <Text>Search for a city...</Text>
        </View>
      )
    }
  }
  render() {
    const { searchInput, searchResult, loading } = this.state;

    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            value={searchInput}
            onChangeText={this.onChangeText}
            placeholder="Search..."
            placeholderTextColor="rgba(0,0,0,0.5)"
            underlineColorAndroid="transparent"
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={this.onSearch}>
            <Ionicons name="md-search" size={32} color="green" />
          </TouchableOpacity>
        </View>
        {
          this._renderContent()
        }
        <LinearGradient colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0)']}>

        </LinearGradient>
      </View>
    )
  }
}

export default SearchScreen;
