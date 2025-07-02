import { icons } from "@/constants/icons";
import images from "@/constants/images";
import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AddFriendButton from "@/components/AddFriendButton";
import { kitchenTypes } from "@/assets/data/data";
import KitchenTypeButton from "@/components/kitchenTypeButton";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { SelectCountry } from "react-native-element-dropdown";
import Slider from "@react-native-community/slider";
import { db } from "@/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const priceCategorie = [
  {
    value: "1",
    lable: "€",
  },
  {
    value: "2",
    lable: "€€",
  },
  {
    value: "3",
    lable: "€€€",
  },
];

const locations = [
  {
    value: "1",
    lable: "Karlsruhe",
  },
  {
    value: "2",
    lable: "Heidelberg",
  },
  {
    value: "3",
    lable: "Mannheim",
  },
];

type PrefModalProps = {
  visible: boolean;
  onClose: (preferences?: {
    selectedTypes: string[];
    priceCat: string;
  }) => void;
  friends: string[];
  search: string;
  setSearch: (text: string) => void;
  filteredUsers: string[];
  onAddFriend: (name: string) => void;
  _props?: any;
  userId: string | undefined;
};

const PrefModal: FC<PrefModalProps> = ({
  visible,
  onClose,
  friends,
  search,
  setSearch,
  filteredUsers,
  onAddFriend,
  _props = {},
  userId,
}) => {
  const [priceCat, setPriceCat] = useState("3"); // Default to '3' for '€€€'
  const [location, setLocation] = useState("Karlsruhe");
  const [radius, setRadius] = useState(20);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserPrefs = async () => {
      if (visible && userId) {
        try {
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Set initial state from Firestore, provide defaults if not present
            setSelectedTypes(userData.cuisinePref || []);
            setPriceCat(userData.pricePref || "3");
          }
        } catch (error) {
          console.error("Error fetching user preferences:", error);
        }
      }
    };

    fetchUserPrefs();
  }, [visible, userId]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    console.log("Selected Kitchen Types:", selectedTypes);
  };

  const handleCloseAndSave = async () => {
    if (userId) {
      try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          cuisinePref: selectedTypes,
          pricePref: priceCat,
        });
      } catch (error) {
        console.error("Error updating user preferences:", error);
      }
    }
    onClose({ selectedTypes, priceCat });
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => onClose()} // Call without saving
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Präferenzen</Text>
          </View>

          <View style={styles.kitchenType}>
            <FlatList
              data={kitchenTypes}
              scrollEnabled={false}
              keyExtractor={(item) => item}
              numColumns={2}
              style={{ height: 100 }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => (
                <KitchenTypeButton
                  name={item}
                  onPress={toggleType}
                  buttonStyle={[
                    styles.kitchenButton,
                    selectedTypes.includes(item) &&
                      styles.kitchenButtonSelected,
                  ]}
                  textStyle={[
                    styles.kitchenButtonText,
                    selectedTypes.includes(item) &&
                      styles.kitchenButtonTextSelected,
                  ]}
                />
              )}
            />
          </View>

          <View style={styles.prefContainer}>
            <View style={styles.row}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Preiskategorie
              </Text>
              <SelectCountry
                style={styles.dropdownPriceCat}
                containerStyle={styles.dropDownList}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                activeColor="#007AFF"
                value={priceCat}
                data={priceCategorie}
                valueField="value"
                labelField="lable"
                imageField="image"
                placeholder={priceCat}
                searchPlaceholder="Search..."
                onChange={(e) => {
                  setPriceCat(e.value);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Ort
              </Text>
              <SelectCountry
                style={styles.dropdownLocation}
                itemContainerStyle={styles.listItemLocation}
                activeColor="#007AFF"
                containerStyle={styles.dropdownListLocation}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                value={location}
                data={locations}
                valueField="value"
                labelField="lable"
                imageField="image"
                placeholder={location}
                searchPlaceholder="Search..."
                onChange={(e) => {
                  setLocation(e.value);
                }}
              />
            </View>
            <View style={styles.row}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Umkreis
              </Text>
              <Slider
                style={{ width: 160, height: 40, marginLeft: 10 }}
                minimumValue={0}
                maximumValue={20}
                lowerLimit={1}
                value={radius}
                onValueChange={setRadius}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#000000"
              />
              <Text style={{ color: "#fff", width: 50 }}>
                {radius.toFixed(0)} km
              </Text>
            </View>
          </View>

          <Pressable onPress={handleCloseAndSave} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Schließen</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#171717",
    borderRadius: 16,
    padding: 20,
    height: "72%",
    justifyContent: "flex-start",
  },
  closeButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    bottom: 15,
    right: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  titleContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    marginTop: 0,
  },
  kitchenButton: {
    height: 38,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 8,
    alignItems: "center",
    minWidth: 120,
    marginHorizontal: 5,
  },
  kitchenButtonSelected: {
    backgroundColor: "#007AFF",
  },
  kitchenButtonText: {
    color: "#171717",
    fontSize: 15,
    fontWeight: "bold",
  },
  kitchenButtonTextSelected: {
    color: "#fff",
  },
  kitchenType: {
    flex: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 67,
    alignItems: "center",
  },
  prefContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
  },
  dropdownPriceCat: {
    margin: 16,
    height: 40,
    width: 85,
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingHorizontal: 8,
  },
  dropdownLocation: {
    margin: 16,
    height: 40,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingHorizontal: 8,
  },
  dropdownListLocation: {
    width: 150,
    borderRadius: 32,
    marginTop: 1,
    overflow: "hidden",
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  dropDownList: {
    width: 85,
    borderRadius: 32,
    marginTop: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  listItemLocation: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default PrefModal;
