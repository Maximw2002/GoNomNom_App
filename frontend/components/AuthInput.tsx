import React, { FC } from "react";
import { Pressable, Text, Image, View, TextInput } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { StyleSheet } from "react-native";

type AuthInputProps = {
  placeholder: string;
  icon: any;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const AuthInput: FC<AuthInputProps> = ({
  placeholder,
  icon,
  value,
  onChangeText,
  secureTextEntry,
}) => (
  <View style={styles.inputContainer}>
    <Image source={icon} style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    width: "80%",
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: "#007AFF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default AuthInput;
