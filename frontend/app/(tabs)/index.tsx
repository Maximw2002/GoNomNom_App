import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  PanResponder,
} from "react-native";
import { StyleSheet } from "react-native";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { icons } from "@/constants/icons";
import CardView from "@/components/RestaurantCard/CardView";
import Header from "@/components/Header";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import FriendsModal from "../../components/Modals/FriendsModal";
import PrefModal from "../../components/Modals/PrefModal";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { User } from "@/interfaces/interfaces";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;
const RESET_DURATION = 300;

export type Card = {
  id: string; // Firestore liefert string IDs
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  address: string;
  priceRange: string;
  images: any;
  description: string;
  starters: string[];
  mains: string[];
  drinks: string[];
  desserts: string[];
};

const Index = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const restaurantsCollection = collection(db, "restaurants");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [allRestaurants, setAllRestaurants] = useState<Card[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  const applyFilter = (restaurantsToFilter: Card[], prefs: User) => {
    let filtered = restaurantsToFilter;

    if (prefs.cuisinePref && prefs.cuisinePref.length > 0) {
      filtered = filtered.filter((restaurant) =>
        prefs.cuisinePref.includes(restaurant.cuisine)
      );
    }

    if (prefs.pricePref) {
      const maxPriceLength = parseInt(prefs.pricePref, 10);
      if (!isNaN(maxPriceLength)) {
        filtered = filtered.filter(
          (restaurant) => restaurant.priceRange.length <= maxPriceLength
        );
      }
    }

    setCards(filtered);
  };

  /* ------------------------------------------------------------------
   * Lade Restaurants – abgesichert gegen undefined doc.data()
   * -----------------------------------------------------------------*/

  useEffect(() => {
    const loadContent = async () => {
      if (user) {
        // Fetch restaurants
        const restaurantsSnap = await getDocs(restaurantsCollection);
        const allFetchedRestaurants = restaurantsSnap.docs.map(
          (d) => ({ id: d.id, ...d.data() } as Card)
        );
        setAllRestaurants(allFetchedRestaurants);

        // Fetch user data and apply preferences
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setCurrentUser(userData);
          applyFilter(allFetchedRestaurants, userData); // Apply initial filter
        } else {
          console.log("No such user!");
          setCards(allFetchedRestaurants); // No user, show all restaurants
        }
      }
    };

    loadContent();
  }, [user]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const nextCardScale = useSharedValue(0.9);
  const dummyTranslate = useSharedValue(0);

  const resetPosition = useCallback(() => {
    translateX.value = withTiming(0, { duration: RESET_DURATION });
    translateY.value = withTiming(0, { duration: RESET_DURATION });
    nextCardScale.value = withTiming(0.9, { duration: RESET_DURATION });
  }, []);

  const onSwipeComplete = useCallback(
    (direction: "right" | "left" | "up" | "down") => {
      const action =
        direction === "right" || direction === "up" ? "LIKED" : "DISLIKED";

      if (cards[0]) console.log("action -->", action, cards[0].name);

      if (cards.length > 0) {
        setCards((prev) => prev.slice(1));
        requestAnimationFrame(() => {
          translateX.value = 0;
          translateY.value = 0;
          nextCardScale.value = 0.8;
          nextCardScale.value = withTiming(0.9, {
            duration: 400,
            easing: Easing.exp,
          });
        });
      } else {
        resetPosition();
      }
    },
    [cards, resetPosition]
  );

  const forceSwipe = useCallback(
    (direction: "right" | "left" | "up" | "down") => {
      /* -----------------------------------------------------------
       * Zielkoordinaten für jede Richtung
       * ---------------------------------------------------------- */
      const swipeConfig = {
        right: { x: SCREEN_WIDTH * 1.5, y: 0 },
        left: { x: -SCREEN_WIDTH * 1.5, y: 0 },
        up: { x: 0, y: -SCREEN_HEIGHT * 1.5 },
        down: { x: 0, y: SCREEN_HEIGHT * 1.5 },
      } as const;

      const { x, y } = swipeConfig[direction];
      const isHorizontal = direction === "left" || direction === "right";

      /* -----------------------------------------------------------
       * X-Achse – Callback nur bei Links / Rechts
       * ---------------------------------------------------------- */
      translateX.value = withTiming(
        x,
        { duration: SWIPE_OUT_DURATION },
        (finished) => {
          if (finished && isHorizontal) {
            runOnJS(onSwipeComplete)(direction);
          }
        }
      );

      /* -----------------------------------------------------------
       * Y-Achse – Callback nur bei Hoch / Runter
       * ---------------------------------------------------------- */
      translateY.value = withTiming(
        y,
        { duration: SWIPE_OUT_DURATION },
        (finished) => {
          if (finished && !isHorizontal) {
            runOnJS(onSwipeComplete)(direction);
          }
        }
      );
    },
    [onSwipeComplete]
  );

  const handleLike = useCallback(() => forceSwipe("right"), [forceSwipe]);
  const handleDislike = useCallback(() => forceSwipe("left"), [forceSwipe]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gesture) => {
          translateX.value = gesture.dx;
          translateY.value = gesture.dy;

          const dragDistance = Math.sqrt(gesture.dx ** 2 + gesture.dy ** 2);
          const progress = Math.min(dragDistance / SWIPE_THRESHOLD, 1);
          nextCardScale.value = 0.9 + 0.1 * progress;
        },

        onPanResponderRelease: (_, gesture) => {
          const absDx = Math.abs(gesture.dx);
          const absDy = Math.abs(gesture.dy);

          if (absDy > absDx) {
            if (gesture.dy < -SWIPE_THRESHOLD) {
              forceSwipe("up");
            } else if (gesture.dy > SWIPE_THRESHOLD) {
              forceSwipe("down");
            } else {
              resetPosition();
            }
          } else {
            if (gesture.dx > SWIPE_THRESHOLD) {
              forceSwipe("right");
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
              forceSwipe("left");
            } else {
              resetPosition();
            }
          }
        },
      }),
    [forceSwipe, resetPosition]
  );

  const btnScaleLike = useSharedValue(1);
  const btnScaleDislike = useSharedValue(1);
  const btnScalePref = useSharedValue(1);
  const btnScaleGroup = useSharedValue(1);

  const btnAnimatedStyleLike = useAnimatedStyle(() => ({
    transform: [{ scale: btnScaleLike.value }],
  }));
  const btnAnimatedStyleDislike = useAnimatedStyle(() => ({
    transform: [{ scale: btnScaleDislike.value }],
  }));
  const btnAnimatedStylePref = useAnimatedStyle(() => ({
    transform: [{ scale: btnScalePref.value }],
  }));
  const btnAnimatedStyleGroup = useAnimatedStyle(() => ({
    transform: [{ scale: btnScaleGroup.value }],
  }));

  /* --------------------------- Friends & Pref --------------------------- */
  const [friendsModalVisible, setFriendsModalVisible] = useState(false);
  const [prefModalVisible, setPrefModalVisible] = useState(false);
  const [friends, setFriends] = useState<string[]>(["Anna"]);
  const [search, setSearch] = useState("");
  const [allUsers] = useState<string[]>([
    "Anna",
    "Ben",
    "Chris",
    "Dora",
    "Ella",
    "Finn",
    "Gina",
    "Hugo",
    "Ivy",
    "Jack",
    "Kara",
  ]);

  const filteredUsers = allUsers.filter(
    (u) =>
      u.toLowerCase().includes(search.toLowerCase()) && !friends.includes(u)
  );

  const handleClosePrefs = (preferences?: {
    selectedTypes: string[];
    priceCat: string;
  }) => {
    setPrefModalVisible(false);
    if (preferences && currentUser) {
      const { selectedTypes, priceCat } = preferences;

      // Update currentUser state locally to reflect changes immediately
      const updatedUser = {
        ...currentUser,
        cuisinePref: selectedTypes,
        pricePref: priceCat,
      };
      setCurrentUser(updatedUser);

      applyFilter(allRestaurants, updatedUser);
    }
  };

  /* ----------------------------- Render ----------------------------- */
  const renderCard = useCallback(
    (card: Card, index: number) => (
      <CardView
        key={card.id}
        card={card}
        index={index}
        totalCards={cards.length}
        panHandlers={index === 0 ? panResponder.panHandlers : {}}
        translateX={index === 0 ? translateX : dummyTranslate}
        translateY={index === 0 ? translateY : dummyTranslate}
        nextCardScale={index === 1 ? nextCardScale : dummyTranslate}
      />
    ),
    [cards.length]
  );

  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
        <Header title="GoNomNom" back={false} />

        {/* Präferenzen-Icon */}
        <Pressable
          onPressIn={() => {
            btnScalePref.value = withTiming(0.8, { duration: 120 });
          }}
          onPressOut={() => {
            btnScalePref.value = withTiming(1, { duration: 120 });
            setPrefModalVisible(true);
          }}
          style={[styles.iconPressable, styles.prefIconPosition]}
        >
          <Animated.View style={[styles.prefContainer, btnAnimatedStylePref]}>
            <Image source={icons.prefIcon} style={styles.prefIcon} />
          </Animated.View>
        </Pressable>

        {/* Gruppen-Icon */}
        <Pressable
          onPressIn={() => {
            btnScaleGroup.value = withTiming(0.8, { duration: 120 });
          }}
          onPressOut={() => {
            btnScaleGroup.value = withTiming(1, { duration: 120 });
            setFriendsModalVisible(true);
          }}
          style={[styles.iconPressable, styles.groupIconPosition]}
        >
          <Animated.View style={[styles.groupContainer, btnAnimatedStyleGroup]}>
            <Image source={icons.group} style={styles.groupIcon} />
          </Animated.View>
        </Pressable>
      </View>

      {/* Modals */}
      <PrefModal
        visible={prefModalVisible}
        onClose={handleClosePrefs}
        friends={friends}
        search={search}
        setSearch={setSearch}
        filteredUsers={filteredUsers}
        onAddFriend={(name) => setFriends([...friends, name])}
        userId={user?.uid} // Pass current user ID
      />

      <FriendsModal
        visible={friendsModalVisible}
        onClose={() => setFriendsModalVisible(false)}
        friends={friends}
        search={search}
        setSearch={setSearch}
        filteredUsers={filteredUsers}
        onAddFriend={(name) => setFriends([...friends, name])}
      />

      {/* Card Deck */}
      <View style={styles.cardDeck}>
        {cards.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {error ?? "No cards available"}
            </Text>
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
                  handleDislike();
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
                  handleLike();
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
    </View>
  );
};

export default Index;

/* --------------------------------------------------------------------------
 * Styles
 * ------------------------------------------------------------------------*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  cardDeck: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
  },
  likeImage: {
    width: 35,
    height: 35,
  },
  dislikeImage: {
    width: 25,
    height: 25,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    zIndex: 5,
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
    color: "#e2e2e2",
    textAlign: "center",
  },
  groupIcon: {
    width: 35,
    height: 35,
  },
  groupContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 6,
  },
  prefIcon: {
    width: 35,
    height: 35,
  },
  prefContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 6,
  },
  HeaderContainer: {
    width: "100%",
    height: 160,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  iconPressable: {},
  prefIconPosition: {
    position: "absolute",
    left: 16,
    top: 60,
    zIndex: 10,
  },
  groupIconPosition: {
    position: "absolute",
    right: 16,
    top: 60,
    zIndex: 10,
  },
});
