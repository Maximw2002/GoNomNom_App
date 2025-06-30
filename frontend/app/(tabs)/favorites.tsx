import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import { icons } from "@/constants/icons";
import Header from "@/components/Header";
import data from "@/assets/data/data"; // Importiere die Daten
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import FavoriteCard from "@/components/FavoriteCard";

const favorites = () => {
  return (
    <View style={styles.container}>
      <Header title="Deine Top Picks" back={false} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default favorites;

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
