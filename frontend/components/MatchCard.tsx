import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card as Restaurant, User } from "../interfaces/interfaces";
import { useRouter } from "expo-router";

interface MatchCardProps {
  restaurant: Restaurant;
  matchedFriends: User[];
}

const MatchCard: React.FC<MatchCardProps> = ({
  restaurant,
  matchedFriends,
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/RestaurantDetails/${restaurant.id}`)}
    >
      <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.matches}>
          Matched mit {matchedFriends.length} Freunden
        </Text>
        <View style={styles.avatarsContainer}>
          {matchedFriends.map((friend) => (
            <Image
              key={friend.id}
              source={{
                uri: friend.profilePicture || "https://via.placeholder.com/40",
              }} // Fallback image
              style={styles.avatar}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(30, 30, 30, 1)", // Semi-transparent white background
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  matches: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  avatarsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -10, // Creates the overlapping effect
    borderWidth: 2,
    borderColor: "rgba(30, 30, 30, 1)",
  },
});

export default MatchCard;
