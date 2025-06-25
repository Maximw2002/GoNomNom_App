import {
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import React, { FC, memo, useEffect } from "react";
import { Card } from "@/assets/data/data";
import {
  Easing,
  Extrapolation,
  interpolate,
  SharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ROTATION_RANGE = 15;

interface CardViewProps {
  card: Card;
  index: number;
  totalCards: number;
  panHandlers: any;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  nextCardScale: SharedValue<number>;
}

const CardView: FC<CardViewProps> = ({
  card,
  index,
  totalCards,
  panHandlers,
  translateX,
  translateY,
  nextCardScale,
}) => {
  const isTopCard = index === 0;
  const isSecondCard = index === 1;

  const leftOffset = useSharedValue(0);
  const cardScale = useSharedValue(isTopCard ? 1 : isSecondCard ? 0.9 : 0.8);
  const cardOpacity = useSharedValue(isTopCard ? 1 : isSecondCard ? 0.9 : 0.8);

  useEffect(() => {
    const targetOffset = isTopCard ? 10 : -25;
    leftOffset.value = withTiming(targetOffset, {
      duration: 300,
      easing: Easing.out(Easing.quad), // Linear easing
    });
  }, [isTopCard, index]);

  useEffect(() => {
    const targetScale = isTopCard ? 1 : isSecondCard ? 0.8 : 0.7;
    cardScale.value = withTiming(targetScale, {
      duration: 300,
      easing: Easing.out(Easing.quad), // Linear easing
    });

    const targetOpacity = isTopCard ? 1 : isSecondCard ? 0.9 : 0;
    cardOpacity.value = withTiming(targetOpacity, {
      duration: 300,
      easing: Easing.out(Easing.quad), // Linear easing
    });
  }, [isTopCard, index, isSecondCard]);

  const animationStyle = useAnimatedStyle(() => {
    const currentX = isTopCard ? translateX.value : 0;
    const currentY = isTopCard ? translateY.value : 0;

    const rotate = interpolate(
      currentX,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-ROTATION_RANGE, 0, ROTATION_RANGE],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      Math.sqrt(currentX ** 2 + currentY ** 2),
      [0, SCREEN_WIDTH * 0.5],
      [1, 0],
      Extrapolation.CLAMP
    );

    const scale = isTopCard ? 1 : isSecondCard ? nextCardScale.value : 0.8;

    return {
      transform: [
        { translateX: currentX + leftOffset.value },
        { translateY: currentY },
        { rotate: `${rotate}deg` },
        { scale },
      ],
      opacity: isTopCard ? opacity : cardOpacity.value,
      zIndex: totalCards - index,
    };
  });

  // Shared value for tap‑feedback scale on the description box
  const descriptionScale = useSharedValue(1);

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: descriptionScale.value }],
  }));

  return (
    <Animated.View style={[styles.card, animationStyle]} {...panHandlers}>
      <View style={styles.cardImage}>
        <Image source={card.image} style={styles.image} />
      </View>

      <Pressable
        onPressIn={() => {
          descriptionScale.value = withTiming(0.94, { duration: 120 });
        }}
        onPressOut={() => {
          descriptionScale.value = withTiming(1, { duration: 120 });
        }}
        style={styles.pressable}
      >
        <Animated.View style={[styles.description, descriptionAnimatedStyle]}>
          <Text style={styles.cardTitle}>{card.name}</Text>

          <View style={styles.row}>
            <Text style={styles.metaGrey}>{card.cuisine}</Text>
            <Text style={styles.metaBold}>{card.priceRange}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.metaStar}> {card.rating} ⭐</Text>
            <Text style={styles.metaGrey}>• {card.distance}</Text>
          </View>

          <Text style={styles.metaAddress}>{card.address}</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default memo(CardView);

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.56,
    backgroundColor: "black",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 40,
    position: "absolute",
    bottom: 100,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pressable: {
    position: "absolute",
    bottom: 15,
    width: "90%",
    height: "25%",
    alignSelf: "center",
  },
  description: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 30,
    paddingBottom: 16,
    paddingTop: 16,
    borderRadius: 40,
  },
  name: {
    fontWeight: "bold",
    color: "#000",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaGrey: {
    fontSize: 18,
    color: "#666",
    marginRight: 10,
  },
  metaBold: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  metaStar: {
    fontSize: 18,
    color: "#FFA500",
    fontWeight: "600",
    marginRight: 10,
  },
  metaAddress: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});
