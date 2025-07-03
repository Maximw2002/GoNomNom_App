import React, { FC } from "react";
import { Modal, View, Text, StyleSheet, Pressable, Image } from "react-native";
import { User } from "@/interfaces/interfaces";
import images from "@/constants/images";
import { icons } from "@/constants/icons";

type MatchModalProps = {
  visible: boolean;
  onClose: () => void;
  matchedFriends: User[];
  currentUser: User | null;
};

const MatchModal: FC<MatchModalProps> = ({
  visible,
  onClose,
  matchedFriends,
  currentUser,
}) => {
  if (!currentUser || !matchedFriends || matchedFriends.length === 0) {
    return null;
  }

  const renderFriendNames = () => {
    if (matchedFriends.length === 1) {
      return (
        <Text style={{ fontWeight: "bold" }}>{matchedFriends[0].userName}</Text>
      );
    }
    const names = matchedFriends.map((f) => f.userName).join(", ");
    return <Text style={{ fontWeight: "bold" }}>{names}</Text>;
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Image source={icons.heart} style={styles.icon} />
            <Text style={styles.title}> It's a Match! </Text>
            <Image source={icons.heart} style={styles.icon} />
          </View>
          <Text style={styles.subtitle}>
            {matchedFriends.length === 1 ? "Dein Freund " : "Deine Freunde "}
            {renderFriendNames()}
            {matchedFriends.length === 1 ? " hat" : " haben"} dieses Restaurant
            ebenfalls geliked!
          </Text>
          <View style={styles.picturesContainer}>
            {matchedFriends.map((friend) => (
              <Image
                key={friend.id}
                source={
                  friend.profilePicture
                    ? { uri: friend.profilePicture }
                    : images.profilePicture
                }
                style={styles.profilePic}
              />
            ))}
          </View>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Super!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#FF4F8B",
    marginHorizontal: 8,
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#171717",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Alkatra-Medium", // Custom Font
  },
  subtitle: {
    fontSize: 18,
    color: "#e2e2e2",
    textAlign: "center",
    marginBottom: 40,
  },
  picturesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MatchModal;
