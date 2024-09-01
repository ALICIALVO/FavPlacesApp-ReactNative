import { insertPlace } from "../utils/database";
//components:
import FavoritePlaceForm from "../components/Places/FavoritePlaceForm";


function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('AllFavoritePlaces');
    // navigation.navigate('AllFavoritePlaces', {
    //   place: place
    // });
  }

  return <FavoritePlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
