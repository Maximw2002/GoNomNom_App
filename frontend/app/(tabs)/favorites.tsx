import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, memo, useCallback } from "react";
import Header from "@/components/Header";
import FavoriteCard from "@/components/FavoriteCard";
import MatchCard from "@/components/MatchCard";
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
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Card as Restaurant, User } from "@/interfaces/interfaces";
import isEqual from "lodash/isEqual";

// Define the structure for a match
interface Match {
  restaurant: Restaurant;
  matchedFriends: User[];
  matchCount: number;
}

const FavoritesScreen = () => {
  const [activeTab, setActiveTab] = useState("favorites");
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>(
    []
  );
  const [groupMatches, setGroupMatches] = useState<
    { restaurant: Restaurant; matchedFriends: User[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const handleDelete = async (restaurantId: string) => {
    if (!user) return;
    setFavoriteRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));
    const userDocRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        favorites: arrayRemove(restaurantId),
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
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
          (doc) => ({ id: doc.id, ...doc.data() } as Restaurant)
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
    setLoading(false);
  }, [user]);

  const fetchGroupMatches = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    try {
      // 1. Get current user's data
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log("User document not found!");
        setLoading(false);
        return;
      }

      const userData = userDocSnap.data() as User;
      const userFavoritesIds = userData.favorites || [];
      const friendIds = userData.friendIds || [];

      if (friendIds.length === 0) {
        setGroupMatches([]);
        setLoading(false);
        return;
      }

      // 2. Get friends' full user data
      const friendsPromises = friendIds.map((id) =>
        getDoc(doc(db, "users", id))
      );
      const friendDocs = await Promise.all(friendsPromises);
      const friends = friendDocs
        .filter((doc) => doc.exists())
        .map((doc) => ({ id: doc.id, ...doc.data() } as User));

      // 3. Find matches
      const restaurantMatches: { [restaurantId: string]: User[] } = {};

      for (const restaurantId of userFavoritesIds) {
        const matchingFriends: User[] = [];
        for (const friend of friends) {
          if (friend.favorites?.includes(restaurantId)) {
            matchingFriends.push(friend);
          }
        }
        if (matchingFriends.length > 0) {
          restaurantMatches[restaurantId] = matchingFriends;
        }
      }

      const matchedRestaurantIds = Object.keys(restaurantMatches);
      if (matchedRestaurantIds.length === 0) {
        setGroupMatches([]);
        setLoading(false);
        return;
      }

      // 4. Fetch restaurant details
      const restaurantsColRef = collection(db, "restaurants");
      const restaurantDocsSnap = await getDocs(restaurantsColRef);
      const allRestaurants = restaurantDocsSnap.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Restaurant)
      );

      const detailedMatches = allRestaurants
        .filter((r) => matchedRestaurantIds.includes(r.id))
        .map((restaurant) => ({
          restaurant,
          matchedFriends: restaurantMatches[restaurant.id],
        }));

      // 5. Sort by number of matches (descending)
      detailedMatches.sort(
        (a, b) => b.matchedFriends.length - a.matchedFriends.length
      );

      setGroupMatches(detailedMatches);
    } catch (error) {
      console.error("Error fetching group matches: ", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (activeTab === "favorites") {
        fetchFavorites();
      } else {
        fetchGroupMatches();
      }
    }, [activeTab, fetchFavorites, fetchGroupMatches])
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    if (activeTab === "favorites") {
      return favoriteRestaurants.length > 0 ? (
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
          <Text style={styles.emptyText}>You have no favorites yet.</Text>
        </View>
      );
    }

    if (activeTab === "matches") {
      if (groupMatches.length === 0) {
        return (
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              Du hast noch keine Matches mit deinen Freunden.
            </Text>
          </View>
        );
      }
      return (
        <FlatList
          data={groupMatches}
          renderItem={({ item }) => (
            <MatchCard
              restaurant={item.restaurant}
              matchedFriends={item.matchedFriends}
            />
          )}
          keyExtractor={(item) => item.restaurant.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Deine Top Picks" back={false} />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "favorites" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("favorites")}
        >
          <Text style={styles.tabText}>Deine Favoriten</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "matches" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("matches")}
        >
          <Text style={styles.tabText}>Group Matches</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "favorites" && favoriteRestaurants.length > 1 && (
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

      <View style={{ flex: 1 }}>{renderContent()}</View>
    </View>
  );
};

export default memo(FavoritesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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
  },
  tournamentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#222",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 25,
    marginTop: 15,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(50, 50, 50, 0.8)",
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    borderColor: "#444",
    borderWidth: 1,
  },
  cardImage: {
    width: 100,
    height: "100%",
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardInfo: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 8,
  },
  friendsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  matchText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
  },
  friendAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  moreFriends: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  moreFriendsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
