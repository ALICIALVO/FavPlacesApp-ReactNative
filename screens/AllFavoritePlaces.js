import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { fetchPlaces } from "../utils/database";
//components:
import { FavoritePlacesList } from "../components/Places/FavoritePlacesList";
// import { Colors } from "../constants/colors";

export function AllFavoritePlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
    // if (isFocused && route.params) {
    //   // Add new place to the list of favorite places
    //   setLoadedPlaces((currentPlaces) => [
    //     ...currentPlaces,
    //     route.params.place,
    //   ]);
    // }
  }, [isFocused]);
  // }, [isFocused, route]);

  return (
    <View style={styles.screen}>
      <FavoritePlacesList places={loadedPlaces} />
    </View>
  );
}

export default AllFavoritePlaces;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});


