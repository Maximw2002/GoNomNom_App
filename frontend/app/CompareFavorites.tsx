import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import RestaurantInfo from "@/components/Compare/RestaurantInfo";
import { Card } from "@/interfaces/interfaces";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { ZoomIn, FadeIn, ZoomOut } from "react-native-reanimated";

const CompareFavorites = () => {
  const router = useRouter();
  const { favorites: favoritesJson } = useLocalSearchParams();

  // State for the two restaurants currently in the matchup
  const [currentMatchup, setCurrentMatchup] = useState<[Card, Card] | null>(
    null
  );
  // State for the list of challengers waiting
  const [challengers, setChallengers] = useState<Card[]>([]);
  // State for the final winner
  const [winner, setWinner] = useState<Card | null>(null);

  // Effect to set up the tournament initially
  useEffect(() => {
    if (typeof favoritesJson === "string") {
      try {
        const parsedFavorites: Card[] = JSON.parse(favoritesJson);
        if (parsedFavorites.length < 2) {
          Alert.alert(
            "Nicht genügend Favoriten",
            "Du benötigst mindestens 2 Favoriten, um ein Turnier zu starten.",
            [{ text: "OK", onPress: () => router.back() }]
          );
          return;
        }

        // Shuffle the favorites to make each tournament unique
        const shuffled = [...parsedFavorites].sort(() => 0.5 - Math.random());

        // Set the first two as the initial matchup
        setCurrentMatchup([shuffled[0], shuffled[1]]);
        // Set the rest as the challengers
        setChallengers(shuffled.slice(2));
        setWinner(null); // Reset winner state for a new tournament
      } catch (error) {
        console.error("Failed to parse favorites JSON:", error);
        Alert.alert("Fehler", "Die Favoriten konnten nicht geladen werden.", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    }
  }, [favoritesJson]);

  // Function to handle the selection of a winner in a matchup
  const handleSelectWinner = (winnerIndex: 0 | 1) => {
    if (!currentMatchup) return;

    const winnerCard = currentMatchup[winnerIndex];
    const loserIndex = 1 - winnerIndex; // The other card is the loser

    // Check if there are more challengers
    if (challengers.length > 0) {
      const nextChallenger = challengers[0];
      const remainingChallengers = challengers.slice(1);

      // Create the new matchup, keeping the winner in their position
      const newMatchup: [Card, Card] = [...currentMatchup];
      // Replace the loser with the next challenger
      newMatchup[loserIndex] = nextChallenger;

      setCurrentMatchup(newMatchup);
      setChallengers(remainingChallengers);
    } else {
      // No more challengers, the selected card is the final winner
      setWinner(winnerCard);
      setCurrentMatchup(null);
    }
  };

  // Render the winner screen
  if (winner) {
    return (
      <View style={styles.container}>
        <Animated.View
          entering={ZoomIn.duration(800)}
          style={styles.winnerContainer}
        >
          <Text style={styles.winnerText}>And the Winner is!</Text>
          <FontAwesome
            name="trophy"
            size={50}
            color="#FFD700"
            style={{ marginBottom: 20 }}
          />
          <RestaurantInfo restaurant={winner} isWinner={true} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(tabs)/favorites")}
          >
            <Text style={styles.buttonText}>Zurück zu deinen Favoriten</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  // Render loading screen while setting up
  if (!currentMatchup) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Turnier wird geladen...</Text>
      </View>
    );
  }

  // Render the current matchup
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wähle deinen Favoriten!</Text>
      <View style={styles.tournamentContainer}>
        {/* Top Card */}
        <Animated.View
          key={currentMatchup[0].id}
          entering={FadeIn.duration(800)}
        >
          <TouchableOpacity onPress={() => handleSelectWinner(0)}>
            <RestaurantInfo restaurant={currentMatchup[0]} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text
          entering={ZoomIn.delay(200)}
          exiting={ZoomOut}
          style={styles.vsText}
        >
          VS
        </Animated.Text>

        {/* Bottom Card */}
        <Animated.View
          key={currentMatchup[1].id}
          entering={FadeIn.duration(800)}
        >
          <TouchableOpacity onPress={() => handleSelectWinner(1)}>
            <RestaurantInfo restaurant={currentMatchup[1]} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 0,
    textAlign: "center",
    fontFamily: "Alkatra-Medium",
  },
  tournamentContainer: {
    width: "100%",
    alignItems: "center",
  },
  vsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    marginVertical: 0,
  },
  winnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  winnerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Alkatra-Medium",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CompareFavorites;
