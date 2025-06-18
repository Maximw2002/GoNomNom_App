import {
  ImageBackground,
  View,
  Image,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
  Text,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

const RestaurantCard = ({ restaurant }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 4 }}>
        {restaurant.name}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Text style={{ fontSize: 15, color: "#666", marginRight: 10 }}>
          {restaurant.cuisine}
        </Text>
        <Text style={{ fontSize: 15, color: "#333", fontWeight: "600" }}>
          {restaurant.priceRange}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Text style={{ fontSize: 15, color: "#FFA500", fontWeight: "600", marginRight: 10 }}>
          ⭐ {restaurant.rating}
        </Text>
        <Text style={{ fontSize: 14, color: "#666" }}>\u2022 {restaurant.distance}</Text>
      </View>

      <Text style={{ fontSize: 14, color: "#888", fontStyle: "italic" }}>
        {restaurant.address}
      </Text>
    </View>
  );
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Index() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let index = 4;
  const closeScale = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const restaurantData = [
    { name: "La Bella Vista", cuisine: "Italienisch", rating: 4.8, distance: "0.8 km", address: "Friedrichsplatz 12, Mannheim", priceRange: "€€€", image: images.restaurantImage },
    { name: "Sakura Sushi", cuisine: "Japanisch", rating: 4.6, distance: "1.2 km", address: "Planken 15, Mannheim", priceRange: "€€", image: images.restaurantImage2 },
    { name: "Burger Palace", cuisine: "Amerikanisch", rating: 4.4, distance: "0.5 km", address: "Paradeplatz 8, Mannheim", priceRange: "€", image: images.restaurantImage3 },
  ];

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const onPressIn = (scale) => {
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 20 }).start();
  };

  const onPressOut = (scale) => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % restaurantData.length;
      fadeIn();

      return newIndex;
    });
    pan.setValue({ x: 0, y: 0 });
    rotate.setValue(0);
  };

  const onLike = () => {
    index = 1;
    Animated.parallel([
      Animated.timing(pan.x, { toValue: SCREEN_WIDTH * 1.5, duration: 500, useNativeDriver: true }),
      Animated.timing(pan.y, { toValue: -SCREEN_WIDTH * 0.7, duration: 500, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 1, duration: 500, useNativeDriver: true })
    ]).start(goToNext);
  };

  const onDislike = () => {
    Animated.parallel([
      Animated.timing(pan.x, { toValue: -SCREEN_WIDTH * 1.5, duration: 500, useNativeDriver: true }),
      Animated.timing(pan.y, { toValue: -SCREEN_WIDTH * 0.7, duration: 500, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: -1, duration: 500, useNativeDriver: true })
    ]).start(goToNext);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        {
          useNativeDriver: false,
          listener: (_, gestureState) => {
            rotate.setValue(gestureState.dx / SCREEN_WIDTH);
          }
        }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100) {
          onLike();
        } else if (gestureState.dx < -100) {
          onDislike();
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
          Animated.spring(rotate, { toValue: 0, useNativeDriver: true }).start();
        }
      }
    })
  ).current;

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-30deg", "0deg", "30deg"],
  });

  const currentRestaurant = restaurantData[currentImageIndex];
  const nextIndex = (currentImageIndex + 1) % restaurantData.length;
  const nextRestaurant = restaurantData[nextIndex];

  return (
    <SafeAreaView className="flex-1 bg-primary items-center pt-10">
      <Header title="GoNomNom" back={false} />
      <View
        className="mt-10 w-full h-full overflow-hidden rounded-t-[70px] relative"
        {...panResponder.panHandlers}
      >
        {/* Hintergrund */}
        <Animated.View
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
            zIndex: 3 }}
        >
          <ImageBackground
            source={nextRestaurant.image}
            className="w-full h-full"
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 250 }}
            />
            <Animated.View
              style={{
                position: "absolute",
                bottom: 130,
                left: 30,
                right: 30,
                opacity: fadeAnim,
              }}
            >
              <RestaurantCard restaurant={nextRestaurant} />
            </Animated.View>
          </ImageBackground>
        </Animated.View>

        {/* Vordergrund */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0, 
            zIndex: index,
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { rotate: rotateInterpolate },
              { perspective: 1000 }
            ],
          }}
        >
          <ImageBackground
            source={currentRestaurant.image}
            className="w-full h-full"
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 250 }}
            />
            <Animated.View
              style={{
                position: "absolute",
                bottom: 130,
                left: 30,
                right: 30,
                opacity: fadeAnim,
              }}
            >
              <RestaurantCard restaurant={currentRestaurant} />
            </Animated.View>
          </ImageBackground>
        </Animated.View>

        {/* Buttons */}
        <View
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 580,
            zIndex: 10,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            paddingHorizontal: 20,
            paddingTop: 20
          }}
        >
          <Pressable
            onPressIn={() => onPressIn(closeScale)}
            onPressOut={() => { onPressOut(closeScale); onDislike(); }}
          >
            <Animated.Image
              source={icons.close}
              style={{
                width: 33,
                height: 33,
                tintColor: "white",
                transform: [{ scale: closeScale }]
              }}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            onPressIn={() => onPressIn(heartScale)}
            onPressOut={() => { onPressOut(heartScale); onLike(); }}
          >
            <Animated.Image
              source={icons.heart}
              style={{
                width: 38,
                height: 38,
                tintColor: "white",
                transform: [{ scale: heartScale }]
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}