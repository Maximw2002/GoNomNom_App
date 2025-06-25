import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import { icons } from "@/constants/icons";
import Header from "@/components/Header";
import data from "@/assets/data/data";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const FavoriteCard = ({ item }: { item: any }) => {
  const btnScaleLike = useSharedValue(1);

  const btnAnimatedStyleLike = useAnimatedStyle(() => ({
    transform: [{ scale: btnScaleLike.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        btnScaleLike.value = withTiming(0.9, { duration: 120 });
      }}
      onPressOut={() => {
        btnScaleLike.value = withTiming(1, { duration: 120 });
      }}
    >
      <Animated.View style={[styles.card, btnAnimatedStyleLike]}>
        <Image source={item.image} style={styles.Image} />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0,0,0,0.2)",
            "rgba(0,0,0,0.4)",
            "rgba(0,0,0,0.6)",
            "rgba(0,0,0,0.8)",
            "#171717",
            "#171717",
          ]}
          style={styles.linearGradient}
        />
        <View style={styles.overlay}>
          <Text style={styles.restaurantName}>{item.name}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  scroll: {
    flex: 1,
  },
  card: {
    marginVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  Image: {
    width: "90%",
    height: 180,
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    bottom: 8,
    width: "90%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
    zIndex: 2,
  },
  restaurantName: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  linearGradient: {
    zIndex: 1,
    position: "absolute",
    width: "90%",
    height: 100,
    borderRadius: 15,
    bottom: 0,
  },
});

export default FavoriteCard;