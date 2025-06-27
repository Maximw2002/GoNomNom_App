import React, { FC } from "react";
import { Pressable, Text, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

type Props = {
  name: string;
  onPress: (name: string) => void;
  buttonStyle?: any;
  textStyle?: any;
};

const kitchenTypeButton: FC<Props> = ({
  name,
  onPress,
  buttonStyle,
  textStyle,
}) => {
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
      onPress={() => onPress(name)}
    >
      <Animated.View style={[buttonStyle, btnAnimatedStyle]}>
        <Text style={textStyle}> {name}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default kitchenTypeButton;
