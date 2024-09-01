import { useState, useEffect } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
import { fetchPlaceDetails } from "../utils/database";

//ui:
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";

export function FavoritePlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function viewMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View styles={styles.fallback}>
        <Text>Loading place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={viewMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default FavoritePlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    minHeight: 300,
    height: "35%",
    width: "100%",
  },
  location: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary150,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
