import { icons } from "@/constants/icons";
import images from "@/constants/images";
import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
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
    label: "€",
  },
  {
    value: "2",
    label: "€€",
  },
  {
    value: "3",
    label: "€€€",
  },
];

const locations = [
  {
    value: "1",
    label: "Karlsruhe",
  },
  {
    value: "2",
    label: "Heidelberg",
  },
  {
    value: "3",
    label: "Mannheim",
  },
];

type PrefModalProps = {
  visible: boolean;
  onClose: (preferences?: {
    selectedTypes: string[];
    priceCat: string;
  }) => void;
  userId: string | undefined;
};

const PrefModal: FC<PrefModalProps> = ({ visible, onClose, userId }) => {
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Präferenzen</Text>
            <Pressable onPress={() => onClose()} style={styles.closeButton}>
              <Image source={icons.closeModal} style={styles.closeIcon} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Küchenstile */}
            <Text style={styles.sectionTitle}>Küchenstil</Text>
            <View style={styles.kitchenTypeContainer}>
              <FlatList
                data={kitchenTypes}
                scrollEnabled={false}
                keyExtractor={(item) => item}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "flex-start" }}
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

            {/* Weitere Filter */}
            <Text style={styles.sectionTitle}>Weitere Filter</Text>
            <View style={styles.filterContainer}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Preiskategorie</Text>
                <SelectCountry
                  style={styles.dropdown}
                  containerStyle={styles.dropdownContainer}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  iconStyle={styles.iconStyle}
                  activeColor="#007AFF"
                  value={priceCat}
                  data={priceCategorie}
                  valueField="value"
                  labelField="label"
                  imageField="image"
                  placeholder={priceCat}
                  onChange={(e) => setPriceCat(e.value)}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Ort</Text>
                <SelectCountry
                  style={[styles.dropdown, { width: 150 }]}
                  containerStyle={[styles.dropdownContainer, { width: 150 }]}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  iconStyle={styles.iconStyle}
                  activeColor="#007AFF"
                  value={location}
                  data={locations}
                  valueField="value"
                  labelField="label"
                  imageField="image"
                  placeholder={location}
                  onChange={(e) => setLocation(e.value)}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Umkreis</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                    style={{ flex: 1, height: 40 }}
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    value={radius}
                    onValueChange={setRadius}
                    minimumTrackTintColor="#007AFF"
                    maximumTrackTintColor="#3a3a3c"
                  />
                  <Text style={styles.sliderValue}>{radius.toFixed(0)} km</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Save Button */}
          <Pressable onPress={handleCloseAndSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Speichern</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Alkatra-Medium",
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    width: 18,
    height: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 0,
    marginBottom: 15,
    fontFamily: "Alkatra-Medium",
  },
  kitchenTypeContainer: {
    marginBottom: 10,
  },
  kitchenButton: {
    flex: 1,
    backgroundColor: "#2c2c2e",
    borderRadius: 8,
    paddingVertical: 12,
    margin: 4,
    alignItems: "center",
    padding: 20,
  },
  kitchenButtonSelected: {
    backgroundColor: "#007AFF",
  },
  kitchenButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  kitchenButtonTextSelected: {
    color: "#fff",
  },
  filterContainer: {
    backgroundColor: "#2c2c2e",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
  },
  rowLabel: {
    color: "#fff",
    fontSize: 16,
  },
  dropdown: {
    height: 35,
    width: 90,
    backgroundColor: "#3a3a3c",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    borderRadius: 8,
    backgroundColor: "#3a3a3c",
    borderWidth: 0,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#fff",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#fff",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
  },
  sliderValue: {
    color: "#fff",
    width: 55,
    textAlign: "right",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default PrefModal;
