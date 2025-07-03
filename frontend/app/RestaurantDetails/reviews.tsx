import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  documentId,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Review {
  id: string;
  rating: number;
  text: string;
  createdAt: any;
  author: string; // Annahme: Name des Autors
}

const ReviewsPage = () => {
  const { id } = useLocalSearchParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);

  // Animation für den Senden-Button
  const btnScale = useSharedValue(1);
  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const fetchReviews = async () => {
    if (typeof id !== "string") {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // 1. Restaurant-Dokument abrufen, um die Review-IDs zu erhalten
      const restaurantRef = doc(db, "restaurants", id);
      const restaurantSnap = await getDoc(restaurantRef);

      if (restaurantSnap.exists()) {
        const restaurantData = restaurantSnap.data();
        const reviewIds = restaurantData.reviews; // Array mit Review-IDs

        if (reviewIds && reviewIds.length > 0) {
          // 2. Alle zugehörigen Reviews mit den IDs abrufen
          const reviewsQuery = query(
            collection(db, "reviews"),
            where(documentId(), "in", reviewIds)
          );
          const reviewsSnapshot = await getDocs(reviewsQuery);

          const fetchedReviews: Review[] = [];
          reviewsSnapshot.forEach((doc) => {
            fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
          });

          // Nach Datum sortieren
          fetchedReviews.sort((a, b) => b.createdAt - a.createdAt);
          setReviews(fetchedReviews);
        } else {
          setReviews([]); // Keine Reviews vorhanden
        }
      } else {
        console.log("Restaurant nicht gefunden!");
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleAddReview = async () => {
    if (newReviewText.trim() === "" || newReviewRating === 0) {
      Alert.alert(
        "Fehler",
        "Bitte geben Sie eine Bewertung und einen Text ein."
      );
      return;
    }
    if (typeof id !== "string") return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert(
        "Fehler",
        "Sie müssen angemeldet sein, um eine Rezension zu schreiben."
      );
      return;
    }

    try {
      // Benutzerdaten aus der 'users'-Collection abrufen
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      // Temporäres Logging, um die Datenstruktur zu überprüfen
      if (userDocSnap.exists()) {
        console.log("Benutzerdaten gefunden:", userDocSnap.data());
      } else {
        console.log("Kein Benutzerdokument für diese UID gefunden.");
      }

      if (!userDocSnap.exists() || !userDocSnap.data()?.userName) {
        Alert.alert(
          "Fehler",
          "Benutzername nicht gefunden. Sie können keine Rezension schreiben."
        );
        return;
      }

      const username = userDocSnap.data()?.userName;

      // 1. Neue Rezension in der 'reviews'-Collection erstellen
      const newReviewRef = await addDoc(collection(db, "reviews"), {
        text: newReviewText,
        rating: newReviewRating,
        createdAt: serverTimestamp(),
        author: username,
        restaurantId: id, // Restaurant-ID zur Rezension hinzufügen
      });

      // 2. Die ID der neuen Rezension zum 'reviews'-Array im Restaurant-Dokument hinzufügen
      const restaurantRef = doc(db, "restaurants", id);
      await updateDoc(restaurantRef, {
        reviews: arrayUnion(newReviewRef.id),
      });

      // 3. Durchschnittliche Bewertung neu berechnen und Restaurant aktualisieren
      const reviewsQuery = query(
        collection(db, "reviews"),
        where("restaurantId", "==", id)
      );
      const reviewsSnapshot = await getDocs(reviewsQuery);

      let totalRating = 0;
      reviewsSnapshot.forEach((doc) => {
        totalRating += doc.data().rating;
      });

      const count = reviewsSnapshot.size;
      const averageRating =
        count > 0 ? Math.round((totalRating / count) * 10) / 10 : 0;

      await updateDoc(restaurantRef, {
        rating: averageRating,
      });

      setModalVisible(false);
      setNewReviewText("");
      setNewReviewRating(0);
      fetchReviews(); // Rezensionen neu laden, um die neue anzuzeigen
    } catch (error) {
      console.error("Error adding review: ", error);
      Alert.alert("Fehler", "Rezension konnte nicht hinzugefügt werden.");
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={20}
          color="#FFD700"
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderReviewItem = ({ item }: { item: Review }) => {
    const createdAtDate = item.createdAt?.toDate();
    const formattedDate = createdAtDate
      ? new Date(createdAtDate).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

    return (
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewAuthor}>{item.author}</Text>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.reviewText}>{item.text}</Text>
        <Text style={styles.reviewDate}>{formattedDate}</Text>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Rezensionen",
          headerStyle: { backgroundColor: "#171717" },
          headerTintColor: "#fff",
          headerBackTitle: "Zurück",
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <Text style={{ color: "white" }}>Lade Rezensionen...</Text>
        ) : (
          <FlatList
            data={reviews}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                Noch keine Rezensionen vorhanden.
              </Text>
            }
          />
        )}

        <TouchableOpacity
          style={styles.addReviewButton}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plus" size={24} color="#fff" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Neue Rezension</Text>
                <View style={styles.starSelection}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setNewReviewRating(star)}
                    >
                      <FontAwesome
                        name={star <= newReviewRating ? "star" : "star-o"}
                        size={36}
                        color="#FFD700"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Schreibe deine Meinung..."
                  placeholderTextColor="#888"
                  value={newReviewText}
                  onChangeText={setNewReviewText}
                  multiline
                />
                <Pressable
                  onPressIn={() => (btnScale.value = withTiming(0.95))}
                  onPressOut={() => (btnScale.value = withTiming(1))}
                  onPress={handleAddReview}
                >
                  <Animated.View
                    style={[styles.submitButton, btnAnimatedStyle]}
                  >
                    <Text style={styles.submitButtonText}>Senden</Text>
                  </Animated.View>
                </Pressable>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Abbrechen</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    padding: 10,
  },
  reviewItem: {
    backgroundColor: "#232323",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewAuthor: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  starsContainer: {
    flexDirection: "row",
  },
  reviewText: {
    color: "#eee",
    fontSize: 14,
    lineHeight: 20,
  },
  reviewDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 10,
    textAlign: "right",
  },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
  addReviewButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#232323",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  starSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 120,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    color: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: "#888",
    fontSize: 16,
  },
});

export default ReviewsPage;
