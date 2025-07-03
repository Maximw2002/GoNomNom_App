import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Section from "@/components/Section";

type Props = {
  visible: boolean;
  onClose: () => void;
  starters: string[];
  mains: string[];
  drinks: string[];
  desserts: string[];
};

const MenuModal: React.FC<Props> = ({
  visible,
  onClose,
  starters,
  mains,
  drinks,
  desserts,
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Speisekarte</Text>

        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Section
            title="Vorspeisen"
            items={starters}
            icon={
              <MaterialIcons
                name="restaurant-menu"
                size={22}
                color="#4fc3f7"
                style={{ marginRight: 8 }}
              />
            }
            color="#4fc3f7"
          />
          <Section
            title="Hauptgerichte"
            items={mains}
            icon={
              <MaterialIcons
                name="local-dining"
                size={22}
                color="#81c784"
                style={{ marginRight: 8 }}
              />
            }
            color="#81c784"
          />
          <Section
            title="Getränke"
            items={drinks}
            icon={
              <MaterialIcons
                name="local-bar"
                size={22}
                color="#ffd54f"
                style={{ marginRight: 8 }}
              />
            }
            color="#ffd54f"
          />
          <Section
            title="Desserts"
            items={desserts}
            icon={
              <MaterialIcons
                name="icecream"
                size={22}
                color="#f06292"
                style={{ marginRight: 8 }}
              />
            }
            color="#f06292"
          />
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "95%",
    maxHeight: "90%",
    backgroundColor: "#232323",
    borderRadius: 26,
    overflow: "hidden",
    alignItems: "flex-start",
    justifyContent: "center",
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 10,
    borderRadius: 20,
  },
  menuTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 25,
    paddingLeft: 25,

    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  itemText: {
    color: "#eee",
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 2,
    lineHeight: 22,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    marginLeft: 8,
    marginBottom: 2,
  },
});

export default MenuModal;
