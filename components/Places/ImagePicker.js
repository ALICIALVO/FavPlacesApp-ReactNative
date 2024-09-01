import { useState } from "react";
import { Image, View, Alert, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { Colors } from "../../constants/colors";

//ui: 
import OutlinedButton from "../UI/OutlinedButton";

export function ImagePicker({onTakeImage}) {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon='camera'>Take Image</OutlinedButton>
      {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
    </View>
  );
}

export default ImagePicker;

//open the camera
//show a button to user to do so
//then after user pick image i show a preview

const styles = StyleSheet.create({
  imagePreview: {
    backgroundColor: Colors.primary200,
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.primary150,
    borderBottomWidth: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: "100%",
  }
});
