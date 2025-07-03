import React, { FC, useCallback } from "react";
import { Pressable, Text, Image, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  name: string;
  onPress: () => void;
  buttonStyle?: any;
  textStyle?: any;
  icon?: any;
  buttonColor: string;
  buttonColorPressed: string;
  txtColor: string; // Optional, if you want a different color when pressed
  txtColorPressed: string; // Optional, if you want a different color when pressed
};

const OverViewButton: FC<Props> = ({
  name,
  onPress,
  buttonColor,
  buttonColorPressed,
  txtColor,
  txtColorPressed,
  buttonStyle,
  textStyle,
  icon,
}) => {
  const btnBgColor = useSharedValue(buttonColor);
  const btnScale = useSharedValue(1);
  const textColor = useSharedValue(txtColor);

  const btnAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: btnBgColor.value,
    transform: [{ scale: btnScale.value }],
  }));
  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: textColor.value,
  }));
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: textColor.value,
  }));

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <Pressable
      onPressIn={() => {
        btnBgColor.value = withTiming(buttonColorPressed, { duration: 300 });
        btnScale.value = withTiming(0.95, { duration: 300 });
        textColor.value = withTiming(txtColorPressed, { duration: 300 });
      }}
      onPressOut={() => {
        btnBgColor.value = withTiming(buttonColor, { duration: 300 });
        btnScale.value = withTiming(1, { duration: 300 });
        textColor.value = withTiming(txtColor, { duration: 300 });
      }}
      onPress={handlePress}
    >
      <Animated.View style={[buttonStyle, btnAnimatedStyle]}>
        <Animated.Text style={[textStyle, textAnimatedStyle]}>
          {name}
        </Animated.Text>
        {icon && (
          <Animated.Image
            source={icon}
            style={[styles.icon, iconAnimatedStyle]}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
    tintColor: "#8e8e93",
    position: "absolute",
    right: 15,
  },
});

export default OverViewButton;
