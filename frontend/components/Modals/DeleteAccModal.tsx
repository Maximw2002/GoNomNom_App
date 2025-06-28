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
            <Text style={styles.title}>Präferenzen</Text>
          </View>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Image
              source={icons.closeModal}
              style={{ width: 20, height: 20, tintColor: "#fff" }}
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
    height: "60%", // <-- 60% der Bildschirmhöhe
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  closeButton: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 8,
    backgroundColor: "#007AFF",
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
});

export default PrefModal;
