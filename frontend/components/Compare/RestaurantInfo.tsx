import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "@/interfaces/interfaces";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import images from "@/constants/images";
import Animated, { FadeIn } from "react-native-reanimated";
import { Stack } from "expo-router";
import ImageModal from "@/components/Modals/ImageModal";

type Props = {
  restaurant: Card;
  isWinner?: boolean;
};

const RestaurantInfo: React.FC<Props> = ({ restaurant, isWinner = false }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImagePress = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  // Filter out invalid image URIs
  const validImages = restaurant.images
    ? restaurant.images.filter(
        (img: any) => typeof img === "string" && img.startsWith("http")
      )
    : [];

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackTitle: "Zurück",
          headerTransparent: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerTintColor: "#fff",
        }}
      />
      <Animated.View
        entering={FadeIn.duration(300)}
        style={[styles.card, isWinner && styles.winnerCard]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollView}
        >
          {validImages.length > 0 ? (
            validImages.map((img: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress({ uri: img })}
              >
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity
              onPress={() => handleImagePress(images.restaurantImage2)}
            >
              <Image
                source={images.restaurantImage2}
                style={styles.galleryImage}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.detailRow}>
              <MaterialIcons name="restaurant-menu" size={22} color="#4fc3f7" />
              <Text style={styles.detailText}>{restaurant.cuisine}</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="star" size={20} color="#FFD700" />
              <Text style={styles.detailText}>{restaurant.rating} / 5</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialIcons name="euro" size={20} color="#81c784" />
              <Text style={styles.detailText}>{restaurant.priceRange}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
      <ImageModal
        visible={modalVisible}
        image={selectedImage}
        onClose={closeModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: 20,
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#2c2c2c",
    overflow: "hidden",
    height: 310, // Ensures the gallery corners are rounded
  },
  winnerCard: {
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  imageScrollView: {
    flexDirection: "row",
  },
  galleryImage: {
    paddingTop: 10,
    width: 370,
    height: 220,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    // Reduced vertical padding
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 0,
    fontFamily: "Alkatra-Medium", // Slightly reduced margin
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginRight: 20, // Reduced margin
  },
  detailText: {
    color: "#eee",
    fontSize: 16, // Slightly smaller text
    marginLeft: 10,
  },
});

export default RestaurantInfo;
