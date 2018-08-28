import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchBar: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    padding: 16
  },
  searchPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResult: {
    flex: 1,
    padding: 16,
  }
})
