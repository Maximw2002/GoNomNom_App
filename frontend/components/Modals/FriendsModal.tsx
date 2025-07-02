import { icons } from "@/constants/icons";
import images from "@/constants/images";
import React, { FC } from "react";
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
import { User } from "@/interfaces/interfaces";

type FriendsModalProps = {
  visible: boolean;
  onClose: () => void;
  friends: User[];
  search: string;
  setSearch: (text: string) => void;
  filteredUsers: User[];
  onAddFriend: (user: User) => void;
  onRemoveFriend: (friendId: string) => void;
};

const FriendsModal: FC<FriendsModalProps> = ({
  visible,
  onClose,
  friends,
  search,
  setSearch,
  filteredUsers,
  onAddFriend,
  onRemoveFriend,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.searchBar}>
            <Image
              source={icons.search}
              style={{ width: 20, height: 20, marginRight: 12, marginTop: 6 }}
            />
            <TextInput
              placeholder="Freunde suchen..."
              placeholderTextColor="#007AFF"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>
          {search.length > 0 && (
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filteredUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <AddFriendButton
                  name={item.userName}
                  onAdd={() => onAddFriend(item)}
                  buttonStyle={styles.buttonAddUser}
                  textStyle={styles.addUserText}
                  imageStyle={styles.addFriendImage}
                  plusIconStyle={styles.plusIcon}
                />
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Keine Nutzer gefunden.</Text>
              }
            />
          )}

          <View style={styles.friendsContainer}>
            <Text style={styles.title}>Deine Freunde</Text>
            <FlatList
              data={friends.slice().reverse()} // Reverse the order to show the latest friends first
              horizontal={true}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.friendItem}>
                  <View>
                    <Image
                      source={
                        item.profilePicture
                          ? { uri: item.profilePicture }
                          : images.profilePicture
                      }
                      style={styles.friendImage}
                      resizeMode="cover"
                    />
                    <Pressable
                      onPress={() => onRemoveFriend(item.id)}
                      style={styles.removeFriendButton}
                    >
                      <Image
                        source={icons.closeModal}
                        style={styles.removeFriendIcon}
                      />
                    </Pressable>
                  </View>
                  <Text style={styles.friendName}>{item.userName}</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Keine Freunde gefunden.</Text>
              }
            />
          </View>
          <Pressable onPress={onClose} style={styles.closeButton}>
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
    height: "50%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    marginTop: 20,
  },
  friendItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 16,
    paddingTop: 10, // Add padding to the right for spacing
  },
  friendImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  friendName: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8, // Add margin to separate name from the image/icon
  },
  removeFriendButton: {
    position: "absolute",
    top: -5, // Adjust to move icon slightly up
    right: -5, // Adjust to move icon slightly to the right
    backgroundColor: "rgba(45, 45, 45, 0.9)",
    borderRadius: 12,
    padding: 2,
    zIndex: 1, // Ensure button is on top
  },
  removeFriendIcon: {
    width: 16,
    height: 16,
  },
  emptyText: {
    color: "#fff",
    marginBottom: 8,
    marginTop: 45,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    marginTop: 16,
    marginBottom: 8,
    color: "#fff",
    backgroundColor: "#232323",
    borderColor: "#007AFF",
    width: "80%",
  },
  buttonAddUser: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    width: "100%",
    marginVertical: 5,
  },
  addUserText: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 0,
    marginBottom: 16,
  },
  friendsContainer: {
    height: 180,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginBottom: 40,
  },
  addFriendImage: {
    width: 30,
    height: 30,
  },
  plusIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 15,
    top: 15,
  },
});

export default FriendsModal;
