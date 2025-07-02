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
  runOnJS,
} from "react-native-reanimated";
import { router, useRouter } from "expo-router";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const FavoriteCard = ({
  item,
  onDelete,
}: {
  item: any;
  onDelete: (id: string) => void;
}) => {
  const btnScaleLike = useSharedValue(1);
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(180 + 24); // initial height + margin

  const btnAnimatedStyleLike = useAnimatedStyle(() => ({
    transform: [{ scale: btnScaleLike.value }],
  }));

  const router = useRouter();

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // Gesture activates after 10px horizontal movement
    .onUpdate((event) => {
      // Allow only left swipes
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      if (event.translationX < -120) {
        // If swiped far enough, trigger delete animation
        translateX.value = withTiming(-500, { duration: 300 });
        itemHeight.value = withTiming(0, { duration: 300 }, () => {
          runOnJS(onDelete)(item.id);
        });
      } else {
        // Otherwise, snap back to original position
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      opacity: itemHeight.value === 0 ? 0 : 1,
      marginVertical: itemHeight.value === 0 ? 0 : 12,
    };
  });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View
      style={[styles.container, animatedContainerStyle, btnAnimatedStyleLike]}
    >
      <View style={styles.deleteBackground}>
        <FontAwesome name="trash" size={30} color="white" />
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedCardStyle}>
          <Pressable
            onPressIn={() => {
              btnScaleLike.value = withTiming(0.9, { duration: 120 });
            }}
            onPressOut={() => {
              btnScaleLike.value = withTiming(1, { duration: 120 });
            }}
            onPress={() =>
              router.push({
                pathname: "/RestaurantDetails/[id]",
                params: { id: item.id },
              })
            }
          >
            <Animated.View style={[styles.card]}>
              <Image
                source={
                  item.images?.[0]
                    ? { uri: item.images[0] }
                    : images.restaurantImage2
                }
                style={styles.Image}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.2)",
                  "rgba(23,23,23,0.4)",
                  "rgba(23,23,23,0.6)",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={styles.linearGradient}
              />
              <View style={styles.overlay}>
                <Text style={styles.restaurantName}>{item.name}</Text>
              </View>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  deleteBackground: {
    backgroundColor: "#E53935",
    position: "absolute",
    top: 12, // Match the card's vertical margin
    bottom: 12, // Match the card's vertical margin
    width: "90%",
    alignSelf: "center",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 30,
  },
  card: {
    alignItems: "center",
    position: "relative",
    backgroundColor: "#171717", // Wichtig, damit der Hintergrund nicht durchscheint
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
    height: 80,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    bottom: 0,
  },
});

export default FavoriteCard;
