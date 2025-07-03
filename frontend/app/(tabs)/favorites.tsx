import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect, memo, useCallback } from "react";
import Header from "@/components/Header";
import FavoriteCard from "@/components/FavoriteCard";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Card } from "@/interfaces/interfaces"; // Adjust the import path as necessary
import isEqual from "lodash/isEqual";

const Favorites = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const isFocused = useIsFocused();
  const navState = useNavigationState((state) => state);
  const router = useRouter();

  const handleDelete = async (restaurantId: string) => {
    if (!user) return;

    // Update local state first for instant UI feedback
    setFavoriteRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));

    // Update Firestore
    const userDocRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        favorites: arrayRemove(restaurantId),
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      // Optional: Revert local state if Firestore update fails
    }
  };

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favoriteIds = userData.favorites || [];

        if (favoriteIds.length > 0) {
          const restaurantsCollection = collection(db, "restaurants");
          const q = query(
            restaurantsCollection,
            where("__name__", "in", favoriteIds)
          );
          const querySnapshot = await getDocs(q);
          const favs = querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Card)
          );
          setFavoriteRestaurants((currentFavs) => {
            if (!isEqual(favs, currentFavs)) {
              return favs;
            }
            return currentFavs;
          });
        } else {
          setFavoriteRestaurants([]);
        }
      } else {
        setFavoriteRestaurants([]);
      }
    } else {
      setFavoriteRestaurants([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (isFocused) {
      // Correctly type the history property from navigation state
      const history = navState.history as { key: string }[] | undefined;
      let cameFromDetails = false;

      if (history && history.length > 1) {
        const previousKey = history[history.length - 2].key;
        // Route keys from Expo Router are formatted as 'routeName-someHash'.
        // We check if the previous route key starts with the name of our details screen.
        if (previousKey.startsWith("RestaurantDetails")) {
          cameFromDetails = true;
        }
      }

      if (cameFromDetails) {
        // If we navigated back from the details page, we don't need to reload.
        // We just ensure the loading spinner is turned off.
        setLoading(false);
      } else {
        // If the screen is focused and we didn't come from the details page,
        // it means we either switched tabs or it's the initial load.
        fetchFavorites();
      }
    }
  }, [isFocused, navState, fetchFavorites]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Deine Top Picks" back={false} />
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  console.log("Favorite Restaurants Data:", favoriteRestaurants);

  return (
    <View style={styles.container}>
      <Header title="Deine Top Picks" back={false} />

      {favoriteRestaurants.length > 1 && (
        <Pressable
          style={styles.tournamentButton}
          onPress={() =>
            router.push({
              pathname: "/CompareFavorites",
              params: { favorites: JSON.stringify(favoriteRestaurants) },
            })
          }
        >
          <Text style={styles.tournamentButtonText}>
            Du kannst dich nicht entscheiden?
          </Text>
        </Pressable>
      )}

      <View style={{ flex: 1 }} pointerEvents="box-none">
        {favoriteRestaurants.length > 0 ? (
          <FlatList
            data={favoriteRestaurants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FavoriteCard item={item} onDelete={handleDelete} />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.center}>
            <Text style={styles.emptyText}>Du hast noch keine Favoriten.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(Favorites);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  center: {
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
  },
  tournamentButton: {
    backgroundColor: "rgba(30, 30, 30, 1)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  tournamentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
