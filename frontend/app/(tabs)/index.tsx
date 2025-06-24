import {
  View,
  Text,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import data, { Card } from "@/assets/data/data";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import CardView from "@/components/RestaurantCard/CardView";
import Header from "@/components/Header";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
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
        panHandlers={index === 0 ? nextCardScale : dummyTranslate} // Use dummyTranslate for non-top cards
        translateX={index === 0 ? translateX : dummyTranslate} // Use dummyTranslate for non-top cards
        translateY={index === 0 ? translateY : dummyTranslate} // Use dummyTranslate for non-top cards
        nextCardScale={index === 0 ? nextCardScale : dummyTranslate} // Use dummyTranslate for non-top cards
      />
    ),
    [cards.length, translateX, translateY, nextCardScale]
  );

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  cardDeck: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000000", // Replace with your desired color or use a theme
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
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
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
