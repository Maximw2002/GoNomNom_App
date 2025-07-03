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
};

const SettingsButton: FC<Props> = ({
  name,
  onPress,
  buttonStyle,
  textStyle,
  icon,
}) => {
  const btnBgColor = useSharedValue("transparent");

  const btnAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: btnBgColor.value,
  }));

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <Pressable
      onPressIn={() => {
        btnBgColor.value = withTiming("#3a3a3c", { duration: 100 });
      }}
      onPressOut={() => {
        btnBgColor.value = withTiming("transparent", { duration: 200 });
      }}
      onPress={handlePress}
    >
      <Animated.View style={[buttonStyle, btnAnimatedStyle]}>
        <Text style={textStyle}>{name}</Text>
        {icon && <Image source={icon} style={styles.icon} />}
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

export default SettingsButton;
