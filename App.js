import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Expo from 'expo';
//
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import MeScreen from './src/screens/MeScreen';

const AppNavigation = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
  Me: { screen: MeScreen },
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
  gesturesEnabled: false
});
export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1,}} forceInset={{ bottom: 'never' }}>
        <View style={styles.adjustStatusBar}>
          <AppNavigation />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  adjustStatusBar: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flex: 1,
  }
})
