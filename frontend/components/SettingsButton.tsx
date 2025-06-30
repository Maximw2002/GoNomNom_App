import React, { FC } from "react";
import { Pressable, Text, Image, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

type Props = {
  name: string;
  onPress: () => void;
  buttonStyle?: any;
  textStyle?: any;
  icon?: any;
  buttonColor?: string;
  textColor?: string;
};

const SettingsButton: FC<Props> = ({
  name,
  onPress,
  buttonStyle,
  textStyle,
  icon,
  buttonColor,
  textColor,
}) => {
  const btnScale = useSharedValue(1);
  const btnColor = useSharedValue(buttonColor || "#fff");
  const txtColor = useSharedValue(textColor || "#000");
  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
    backgroundColor: btnColor.value,
  }));
  const txtAnimatedStyle = useAnimatedStyle(() => ({
    color: txtColor.value,
  }));
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: txtColor.value,
  }));

  return (
    <Pressable
      onPressIn={() => {
        btnScale.value = withTiming(0.9, { duration: 200 });
        btnColor.value = withTiming(buttonColor || "#007AFF", {
          duration: 200,
        });
        txtColor.value = withTiming("#fff", { duration: 200 });
      }}
      onPressOut={() => {
        btnScale.value = withTiming(1, { duration: 200 });
        btnColor.value = withTiming(buttonColor || "#fff", { duration: 200 });
        txtColor.value = withTiming(textColor || "#000", { duration: 200 });
      }}
      onPress={() => onPress()}
    >
      <Animated.View style={[buttonStyle, btnAnimatedStyle]}>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <Animated.Text style={[textStyle, txtAnimatedStyle]}>
            {name}
          </Animated.Text>
          {icon && (
            <Animated.Image
              source={icon}
              style={[
                {
                  width: 20,
                  height: 20,
                  position: "absolute",
                  right: 0,
                },
                iconAnimatedStyle,
              ]}
            />
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default SettingsButton;
