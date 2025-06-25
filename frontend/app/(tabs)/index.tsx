import {
  View,
  Text,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Image,
  Pressable,
  PanResponder,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { use, useCallback, useRef, useState } from "react";
import data, { Card } from "@/assets/data/data";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import CardView from "@/components/RestaurantCard/CardView";
import Header from "@/components/Header";
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;
const RESET_DURATION = 300;

const Index = () => {
  const [cards, setCards] = useState<Card[]>(data);
  const translateX = useSharedValue(0); // Placeholder for SharedValue
  const translateY = useSharedValue(0); // Placeholder for SharedValue
  const nextCardScale = useSharedValue(0.9);
  const dummyTranslate = useSharedValue(0); // Placeholder for SharedValue

  const resetPosition = useCallback(() => {
    translateX.value = withTiming(0, { duration: RESET_DURATION });
    translateY.value = withTiming(0, { duration: RESET_DURATION });
    nextCardScale.value = withTiming(0.9, { duration: RESET_DURATION });
  }, []);

  const onSwipeComplete = useCallback(
    (direction: "right" | "left" | "up" | "down") => {
      const action =
        direction === "right" || direction === "up" ? "LIKED" : "DISLIKED";

      console.log("action -->", action, cards[0].name);

      if (cards.length > 0) {
        setCards((prevCards) => prevCards.slice(1));
        requestAnimationFrame(() => {
          translateX.value = 0;
          translateY.value = 0;
          nextCardScale.value = 0.8;
          nextCardScale.value = withTiming(0.9, {
            duration: 400,
            easing: Easing.exp,
          });
        });
      } else {
        resetPosition();
      }
    },
    [cards, resetPosition]
  );

  const forceSwipe = useCallback(
    (direction: "right" | "left" | "up" | "down") => {
      const swipeConfig = {
        right: { x: SCREEN_WIDTH * 1.5, y: 0 },
        left: { x: -SCREEN_WIDTH * 1.5, y: 0 },
        up: { x: 0, y: -SCREEN_HEIGHT * 1.5 },
        down: { x: 0, y: SCREEN_HEIGHT * 1.5 },
      };

      translateX.value = withTiming(swipeConfig[direction].x, {
        duration: SWIPE_OUT_DURATION,
      });
      translateY.value = withTiming(
        swipeConfig[direction].y,
        {
          duration: SWIPE_OUT_DURATION,
        },
        () => runOnJS(onSwipeComplete)(direction)
      );
    },
    [onSwipeComplete]
  );

  const handleLike = useCallback(() => forceSwipe("right"), [forceSwipe]);
  const handleDislike = useCallback(() => forceSwipe("left"), [forceSwipe]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        translateX.value = gesture.dx;
        translateY.value = gesture.dy;

        const dragDistance = Math.sqrt(gesture.dx ** 2 + gesture.dy ** 2);
        const progress = Math.min(dragDistance / SWIPE_THRESHOLD, 1);
        nextCardScale.value = 0.9 + 0.1 * progress;
      },

      onPanResponderRelease: (_, gesture) => {
        const absDx = Math.abs(gesture.dx);
        const absDy = Math.abs(gesture.dy);

        if (absDy > absDx) {
          if (gesture.dy < -SWIPE_THRESHOLD) {
            forceSwipe("up");
          } else if (gesture.dy > SWIPE_THRESHOLD) {
            forceSwipe("down");
          } else {
            resetPosition();
          }
        } else {
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe("right");
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            forceSwipe("left");
          } else {
            resetPosition();
          }
        }
      },
    })
  ).current;

  const btnScaleLike = useSharedValue(1);
  const btnScaleDislike = useSharedValue(1);

  const btnAnimatedStyleLike = useAnimatedStyle(() => ({
    transform: [{ scale: btnScaleLike.value }],
  }));
  const btnAnimatedStyleDislike = useAnimatedStyle(() => ({
    transform: [{ scale: btnScaleDislike.value }],
  }));

  const renderCard = useCallback(
    (card: Card, index: number) => (
      <CardView
        key={card.id}
        card={card}
        index={index}
        totalCards={cards.length}
        panHandlers={index === 0 ? panResponder.panHandlers : {}} // Use dummyTranslate for non-top cards
        translateX={index === 0 ? translateX : dummyTranslate} // Use dummyTranslate for non-top cards
        translateY={index === 0 ? translateY : dummyTranslate} // Use dummyTranslate for non-top cards
        nextCardScale={index === 1 ? nextCardScale : dummyTranslate} // Use dummyTranslate for non-top cards
      />
    ),
    [
      cards.length,
      panResponder.panHandlers,
      translateX,
      translateY,
      nextCardScale,
    ]
  );

  return (
    <View style={styles.container}>
      <Header title="GoNomNom" back={false} />
      <View style={styles.cardDeck}>
        {cards.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No cards available</Text>
          </View>
        ) : (
          <>
            {cards.map(renderCard).reverse()}
            <View style={styles.buttonContainer}>
              <Pressable
                onPressIn={() => {
                  btnScaleDislike.value = withTiming(0.9, { duration: 120 });
                }}
                onPressOut={() => {
                  btnScaleDislike.value = withTiming(1, { duration: 120 });
                  handleDislike();
                }}
              >
                <Animated.View style={[styles.btn, btnAnimatedStyleDislike]}>
                  <Image source={icons.close} style={styles.dislikeImage} />
                </Animated.View>
              </Pressable>
              <Pressable
                onPressIn={() => {
                  btnScaleLike.value = withTiming(0.9, { duration: 120 });
                }}
                onPressOut={() => {
                  btnScaleLike.value = withTiming(1, { duration: 120 });
                  handleLike();
                }}
              >
                <Animated.View style={[styles.btn, btnAnimatedStyleLike]}>
                  <Image source={icons.heart} style={styles.likeImage} />
                </Animated.View>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717", // Replace with your desired color or use a theme
  },
  cardDeck: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#171717", // Replace with your desired color or use a theme
    alignItems: "center",
    justifyContent: "center",
  },
  likeImage: {
    width: 35,
    height: 35,
    paddingTop: 4,
    // Replace with your desired color or use a theme
  },
  dislikeImage: {
    width: 25,
    height: 25,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    zIndex: 5,
  },
  btn: {
    width: 70,
    height: 70,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 60,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});
