import { icons } from "@/constants/icons";
import images from "@/constants/images";
import React, { FC, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  TouchableHighlight,
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

type DeleteAccModalProps = {
  visible: boolean;
  onClose: () => void;
  _props?: any;
};

const PrefModal: FC<DeleteAccModalProps> = ({
  visible,
  onClose,
  _props = {},
}) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Konto löschen</Text>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.txt}>
              Bist du sicher, dass du dein Konto löschen möchtest? Dies wird
              alle deine Daten und Einstellungen dauerhaft entfernen.
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#686868" // etwas dunkler als #FF0101 für schönes Feedback
              onPress={() => {
                console.log("Account deleted");
              }}
              style={styles.noBtnContainer}
            >
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Nein
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#c62828" // etwas dunkler als #FF0101 für schönes Feedback
              onPress={() => {
                console.log("Account deleted");
              }}
              style={styles.yesBtnContainer}
            >
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Ja
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Image
              source={icons.closeModal}
              style={{ width: 20, height: 20 }}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    backgroundColor: "#303030",
    borderRadius: 16,
    padding: 20,
    height: "45%", // <-- 60% der Bildschirmhöhe
    justifyContent: "flex-start",
  },
  closeButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 8,
    borderRadius: 8,
    top: 15,
    right: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    marginTop: 0,
  },
  txtContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  txt: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  noBtnContainer: {
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#8C8C8C",
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  yesBtnContainer: {
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FF0101",
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 20,
  },
});

export default PrefModal;
