import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
//
import { fetchTempByLocation } from '../services/weatherAPI';
import styles from './MeScreenStyles';


class MeScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      return <Ionicons name="ios-pin-outline" size={25} color={tintColor} />;
    }
  });
  constructor() {
    super();
    this.state = {
      error: '',
      loading: false,
      data: {}
    }
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.getTemp(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );
  }
  getTemp = async (lat, long) => {
    this.setState({
      loading: true,
    })
    try {
      const res = await fetchTempByLocation(lat, long);
      const data = await res.json();
      if(data.cod === "404") throw new Error('Error Gettig Weather Condtions')
      this.setState({
        data: data,
        loading: false,
      })
    } catch (err) {
      this.setState({
        error: err.message || '',
        loading: false
      });
    }
  };

  render() {
    const { loading, error, data } = this.state;
    let contentJSX;
    if(loading) {
      contentJSX =  <ActivityIndicator size="large" />
    } else if(error) {
      contentJSX =  <Text>{error}</Text>
    } else {
      contentJSX = <Text>{JSON.stringify(data)}</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Weather Screen</Text>
        {contentJSX}
      </View>
    )
  }
}

export default MeScreen;
