import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { Colors } from "../../constants/colors";

export function FavoritePlaceItem({onSelect, place }){
    return (
      <View style={styles.cardContainer}> 
        <Pressable style={({pressed})=> [styles.itemContainer, pressed && styles.pressed]} onPress={onSelect.bind(this, place.id)}>
          <Image style={styles.image} source={{ uri: place.imageUri }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.address}>{place.address}</Text>
          </View>
        </Pressable>
        </View>
      );
}

export default FavoritePlaceItem;

const styles = StyleSheet.create({
  cardContainer:{
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 10, // Round corners for the shadow container
    backgroundColor: 'white', // Necessary for elevation on Android
    shadowColor: '#000', // iOS shadow color
    shadowOpacity: 0.2, // iOS shadow opacity
    shadowOffset: { width: 3, height: 2 }, // iOS shadow offset
    shadowRadius: 3, // iOS shadow radius
    elevation: 5, // Android shadow elevation
  },
    itemContainer: {
      flexDirection: "row",
      backgroundColor: Colors.primary150,
      borderRadius: 10, // Match the outer container's border radius
      overflow: 'hidden', // Ensure content is clipped within the rounded corners
      
    },
  pressed: {
    opacity: 0.8,
  },
    image: {
      // flex:1,
      width: 100,
      height: 100,
      // borderRadius: 8,
    },
    textContainer: {
      flex: 1,
      padding: 12,
      // paddingLeft: 10,
      
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
    },
    address: {
      fontSize: 12,
      color: Colors.primary250,
    },
  });


  