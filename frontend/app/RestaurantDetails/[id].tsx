import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useLocalSearchParams,
  useRouter,
  Stack,
  useFocusEffect,
} from "expo-router";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons"; // Icons für modernes Design
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ClickableImage from "@/components/ClickableImage";
import ImageModal from "@/components/Modals/ImageModal";
import MenuModal from "@/components/Modals/MenuModal";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Card } from "../../interfaces/interfaces"; // Importieren Sie die Card-Schnittstelle

const SCREEN_WIDTH = Dimensions.get("window").width;

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Hooks für Animationen an den Anfang verschoben
  const btnScale = useSharedValue(1);
  const btnColor = useSharedValue("#007AFF");
  const txtColor = useSharedValue("#fff");
  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
    backgroundColor: btnColor.value,
  }));
  const txtAnimatedStyle = useAnimatedStyle(() => ({
    color: txtColor.value,
  }));

  // Animation für den Rezensions-Button
  const reviewBtnScale = useSharedValue(1);
  const reviewBtnColor = useSharedValue("#4fc3f7");
  const reviewTxtColor = useSharedValue("#fff");
  const reviewBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reviewBtnScale.value }],
    backgroundColor: reviewBtnColor.value,
  }));
  const reviewTxtAnimatedStyle = useAnimatedStyle(() => ({
    color: reviewTxtColor.value,
  }));

  useFocusEffect(
    React.useCallback(() => {
      const fetchRestaurant = async () => {
        if (typeof id !== "string") {
          setLoading(false);
          return;
        }
        try {
          const restaurantDoc = doc(db, "restaurants", id);
          const docSnap = await getDoc(restaurantDoc);

          if (docSnap.exists()) {
            setRestaurant({ id: docSnap.id, ...docSnap.data() } as Card);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching restaurant:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRestaurant();
    }, [id])
  );

  // FlatList-Renderfunktion für das gewünschte Layout
  const renderImages = () => {
    const images = restaurant?.images;
    if (!images) return null; // Sicherstellen, dass images existiert

    const layout = [];
    let i = 0;
    while (i < images.length) {
      // Großes Bild
      layout.push({ type: "large", image: images[i] });
      i++;
      // Zwei kleine nebeneinander (falls vorhanden)
      if (i < images.length) {
        const row = [images[i]];
        i++;
        if (i < images.length) {
          row.push(images[i]);
          i++;
        }
        layout.push({ type: "row", images: row });
      }
    }

    return (
      <FlatList
        data={layout}
        keyExtractor={(_, idx) => idx.toString()}
        scrollEnabled={true}
        renderItem={({ item }) => {
          if (item.type === "large") {
            return (
              <ClickableImage
                picture={item.image}
                onPress={() => {
                  setSelectedImage(item.image);
                  setModalVisible(true);
                }}
                viewStyle={{ flex: 1 }}
                pictureStyle={styles.mainImage}
              />
            );
          }
          if (item.type === "row") {
            return (
              <View style={styles.rowImages}>
                <ClickableImage
                  picture={item.images?.[0]}
                  onPress={() => {
                    setSelectedImage(item.images?.[0]);
                    setModalVisible(true);
                  }}
                  viewStyle={{ flex: 1 }}
                  pictureStyle={styles.smallImage}
                />

                {item.images?.[1] && (
                  <ClickableImage
                    picture={item.images?.[1]}
                    onPress={() => {
                      setSelectedImage(item.images?.[1]);
                      setModalVisible(true);
                    }}
                    viewStyle={{ flex: 1 }}
                    pictureStyle={styles.smallImage}
                  />
                )}
              </View>
            );
          }
          return null;
        }}
      />
    );
  };

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
      {loading ? (
        <View style={styles.container}>
          <Text style={{ color: "white" }}>Loading...</Text>
        </View>
      ) : !restaurant ? (
        <View style={styles.container}>
          <Text>Restaurant nicht gefunden.</Text>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "#171717" }}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{restaurant.name}</Text>
              <View style={styles.row}>
                <MaterialIcons name="place" size={18} color="#ffb300" />
                <Text style={styles.address}>{restaurant.address}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoBox}>
                <MaterialIcons
                  name="restaurant-menu"
                  size={18}
                  color="#4fc3f7"
                />
                <Text style={styles.infoText}>{restaurant.cuisine}</Text>
              </View>
              <View style={styles.infoBox}>
                <FontAwesome name="star" size={18} color="#FFD700" />
                <Text style={styles.infoText}>
                  {restaurant.rating} / 5 ({restaurant.reviews?.length || 0})
                </Text>
              </View>
              <View style={styles.infoBox}>
                <MaterialIcons name="euro" size={18} color="#81c784" />
                <Text style={styles.infoText}>{restaurant.priceRange}</Text>
              </View>
              <View style={styles.infoBox}>
                <MaterialIcons
                  name="directions-walk"
                  size={18}
                  color="#f06292"
                />
                <Text style={styles.infoText}>{restaurant.distance}</Text>
              </View>
            </View>

            <View style={styles.imagesContainer}>{renderImages()}</View>

            {/* Beschreibungstitel mit Icon */}
            <View style={styles.descHeaderContainer}>
              <Text style={styles.descHeader}>Beschreibung</Text>
            </View>

            <Text style={styles.description}>{restaurant.description}</Text>

            <View style={styles.buttonsRow}>
              <Pressable
                onPressIn={() => {
                  btnScale.value = withTiming(0.9, { duration: 200 });
                  btnColor.value = withTiming("#fff", {
                    duration: 200,
                  });
                  txtColor.value = withTiming("#000", { duration: 200 });
                }}
                onPressOut={() => {
                  btnScale.value = withTiming(1, { duration: 200 });
                  btnColor.value = withTiming("#007AFF", { duration: 200 });
                  txtColor.value = withTiming("#fff", { duration: 200 });
                }}
                onPress={() => setMenuVisible(true)}
              >
                <Animated.View style={[styles.regBtnStyle, btnAnimatedStyle]}>
                  <Animated.Text
                    style={[styles.regTextStyle, txtAnimatedStyle]}
                  >
                    Speisekarte
                  </Animated.Text>
                </Animated.View>
              </Pressable>

              <Pressable
                onPressIn={() => {
                  reviewBtnScale.value = withTiming(0.9, { duration: 200 });
                  reviewBtnColor.value = withTiming("#fff", {
                    duration: 200,
                  });
                  reviewTxtColor.value = withTiming("#000", {
                    duration: 200,
                  });
                }}
                onPressOut={() => {
                  reviewBtnScale.value = withTiming(1, { duration: 200 });
                  reviewBtnColor.value = withTiming("#4fc3f7", {
                    duration: 200,
                  });
                  reviewTxtColor.value = withTiming("#fff", {
                    duration: 200,
                  });
                }}
                onPress={() =>
                  router.push(`/RestaurantDetails/reviews?id=${id}`)
                }
              >
                <Animated.View
                  style={[styles.regBtnStyle, reviewBtnAnimatedStyle]}
                >
                  <Animated.Text
                    style={[styles.regTextStyle, reviewTxtAnimatedStyle]}
                  >
                    Rezensionen
                  </Animated.Text>
                </Animated.View>
              </Pressable>
            </View>

            {/* Modal für Bildanzeige */}
            <ImageModal
              visible={modalVisible}
              image={selectedImage}
              onClose={() => setModalVisible(false)}
            />
            <MenuModal
              visible={menuVisible}
              onClose={() => setMenuVisible(false)}
              starters={restaurant.starters}
              mains={restaurant.mains}
              drinks={restaurant.drinks}
              desserts={restaurant.desserts}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0,
  },
  imagesContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    height: 290,
  },
  mainImage: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    marginBottom: 10,
  },
  rowImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallImage: {
    width: (SCREEN_WIDTH * 0.9 - 10) / 2, // 90% Breite minus Abstand
    height: 90,
    borderRadius: 16,
    marginBottom: 10,
  },
  titleContainer: {
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    marginTop: 0, // Reduziert von 100, da der Header nicht mehr transparent ist
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 0,
    fontFamily: "Alkatra-Medium", // Custom Font
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  address: {
    color: "#bbb",
    fontSize: 16,
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap", // <-- Zeilenumbruch aktivieren
    justifyContent: "flex-start", // Optional: linksbündig
    width: "92%",
    marginTop: 0,
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232323",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  infoText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "600",
  },
  descHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 24,
    marginTop: 10,
    marginBottom: 2,
  },
  descHeader: {
    color: "#4fc3f7",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  description: {
    color: "#eee",
    fontSize: 16,
    marginHorizontal: 24,
    marginTop: 4,
    marginBottom: 20,
    textAlign: "left",
    lineHeight: 22,
    backgroundColor: "#232323",
    borderRadius: 14,
    padding: 14,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  regBtnStyle: {
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  regTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#171717",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
});

export default RestaurantDetails;
