import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export function Button({ children, onPress }) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary150,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    margin: 4,
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
    color: Colors.primary250,
  },
  pressed: {
    opacity: 0.7,
  },
});
