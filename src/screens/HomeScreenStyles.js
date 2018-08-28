import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  title: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  row: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    // fontFamily: 'Avenir'
    fontWeight: 'bold',
    fontSize: 25,
  },
  cold: {
    color: '#1f9fff'
  },
  medium: {
    color: '#0fff76'
  },
  hot: {
    color: '#ffb200'
  },
  vhot: {
    color: '#ff500a'
  }
})
