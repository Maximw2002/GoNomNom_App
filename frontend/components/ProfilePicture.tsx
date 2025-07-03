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
  picture: any;
  index: number;
  onPress: (index: number) => void;
  viewStyle?: any;
  pictureStyle?: any;
};

const ProfilePicture: FC<Props> = ({
  picture,
  index,
  onPress,
  viewStyle,
  pictureStyle,
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
      onPress={() => onPress(index)}
    >
      <Animated.View style={[viewStyle, btnAnimatedStyle]}>
        <Image source={picture} style={pictureStyle} resizeMode="cover" />
      </Animated.View>
    </Pressable>
  );
};

export default ProfilePicture;
