import { View, FlatList, Text, StyleSheet } from "react-native";

import FavoritePlaceItem from "./FavoritePlaceItem";

import { Colors } from "../../constants/colors";

import {useNavigation} from '@react-navigation/native';


export function FavoritePlacesList({ places }) {
  const navigation = useNavigation();

  
  function selectPlaceDetailsHandler(id){
    navigation.navigate('FavoritePlaceDetails', {
      placeId: id,
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No Places Added Yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
      <FavoritePlaceItem place={item} onSelect={selectPlaceDetailsHandler}/>)}
    />
  );
}
export default FavoritePlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary350,
    
  },
});

// const FAVORITE_PLACES = [
//   {
//     id: 1,
//     name: "Central Park",
//     location: "Central Park, New York, NY 10024, USA",
//     imageUri:
//       "https://plus.unsplash.com/premium_photo-1680836316292-74ea0b9c6ce7?q=80&w=1599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 2,
//     name: "Eiffel Tower",
//     location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
//     imageUri:
//       "https://images.unsplash.com/photo-1609971757431-439cf7b4141b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];
