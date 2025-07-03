import React from "react";
import { Pressable, Text, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

type Props = {
  name: string;
  onAdd: (name: string) => void;
  buttonStyle?: any;
  textStyle?: any;
  imageStyle?: any;
  plusIconStyle?: any;
};

const AddFriendButton: React.FC<Props> = ({ name, onAdd, buttonStyle, textStyle, imageStyle, plusIconStyle }) => {
  const btnScale = useSharedValue(1);
  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        btnScale.value = withTiming(0.9, { duration: 120 });
      }}
      onPressOut={() => {
        btnScale.value = withTiming(1, { duration: 120 });
      }}
        onPress={() => onAdd(name)}
    >
      <Animated.View style={[buttonStyle, btnAnimatedStyle]}>
        <Image source={images.profilePicture} style={imageStyle} />
        <Text style={textStyle}> {name}</Text>
        <Image source={icons.plus} style={plusIconStyle} />
      </Animated.View>
    </Pressable>
  );
};

export default AddFriendButton;