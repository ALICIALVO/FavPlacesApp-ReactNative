import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen';
//constans:
import { Colors } from "./constants/colors";
//utils:
import { init } from "./utils/database";
//ui components:
import { IconButton } from "./components/UI/IconButton";

//screens:
import AllFavoritePlaces from "./screens/AllFavoritePlaces";
import AddNewPlace from "./screens/AddNewPlace";
import FavoritePlaceDetails from "./screens/FavoritePlaceDetails";
import Map from "./screens/Map";



const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
     async function initDB(){
      try{
        SplashScreen.preventAutoHideAsync();
        await init();
        setDbInitialized(true);
        SplashScreen.hideAsync();

      }catch(error){
        console.log(error);
        
      }
      // Keep the splash screen visible while we fetch resources:
    }
    initDB();
  },[]);

  if(!dbInitialized){
    return null;
  }
  
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: Colors.primary250,
            headerStyle: { backgroundColor: Colors.primary100 },
            contentStyle: { backgroundColor: Colors.primary200 },
          }}
        >
          <Stack.Screen
            name="AllFavoritePlaces"
            component={AllFavoritePlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                // console.log(tintColor);
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddFavoritePlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddFavoritePlace"
            component={AddNewPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
            name="FavoritePlaceDetails"
            component={FavoritePlaceDetails}
            options={{
              title: 'Loading Place...'
            }}
            // options={({ navigation }) => ({
            //   title: "Favorite Place",
            //   headerLeft: ({ tintColor }) => (
            //     <IconButton
            //       icon="arrow-back"
            //       color={tintColor}
            //       size={24}
            //       onPress={() => {
            //         navigation.goBack();
            //       }}
            //     />
            //   ),
            // })}
          />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
