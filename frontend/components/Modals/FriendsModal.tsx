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
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
  const renderFriendItem = ({ item }: { item: User }) => (
    <View style={styles.friendItem}>
      <Image
        source={
          item.profilePicture
            ? { uri: item.profilePicture }
            : images.profilePicture
        }
        style={styles.friendImage}
        resizeMode="cover"
      />
      <Text style={styles.friendName}>{item.userName}</Text>
      <Pressable
        onPress={() => onRemoveFriend(item.id)}
        style={styles.removeFriendButton}
      >
        <Image source={icons.deleteIcon} style={styles.removeFriendIcon} />
      </Pressable>
    </View>
  );

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Image
        source={
          item.profilePicture
            ? { uri: item.profilePicture }
            : images.profilePicture
        }
        style={styles.friendImage}
      />
      <Text style={styles.friendName}>{item.userName}</Text>
      <Pressable onPress={() => onAddFriend(item)} style={styles.addButton}>
        <Image source={icons.register} style={styles.addIcon} />
      </Pressable>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Freunde</Text>
                <Pressable onPress={onClose} style={styles.closeButton}>
                  <Image source={icons.closeModal} style={styles.closeIcon} />
                </Pressable>
              </View>

              {/* Search Bar */}
              <View style={styles.searchBar}>
                <Image
                  source={icons.search}
                  style={{ width: 20, height: 20, marginRight: 12 }}
                />
                <TextInput
                  placeholder="Freunde suchen..."
                  placeholderTextColor="#8e8e93"
                  value={search}
                  onChangeText={setSearch}
                  style={styles.searchInput}
                />
              </View>

              {/* Content */}
              <View style={styles.contentContainer}>
                {search.length > 0 ? (
                  <FlatList
                    data={filteredUsers}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                      <Text style={styles.emptyText}>
                        Keine Nutzer gefunden.
                      </Text>
                    }
                  />
                ) : (
                  <FlatList
                    data={friends}
                    renderItem={renderFriendItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                      <View style={styles.noFriendsContainer}>
                        <Text style={styles.emptyText}>
                          Du hast noch keine Freunde.
                        </Text>
                        <Text style={styles.emptySubText}>
                          Füge Freunde hinzu, um zu sehen, was ihnen gefällt!
                        </Text>
                      </View>
                    }
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    maxHeight: "80%",
    minHeight: "40%",
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2c2e",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 12,
  },
  contentContainer: {
    flexGrow: 1,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
  },
  friendImage: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 16,
  },
  friendName: {
    fontSize: 17,
    color: "#fff",
    flex: 1,
  },
  removeFriendButton: {
    padding: 8,
  },
  removeFriendIcon: {
    width: 20,
    height: 20,
  },
  addButton: {
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  addIcon: {
    width: 20,
    height: 20,
  },
  emptyText: {
    color: "#8e8e93",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  noFriendsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptySubText: {
    color: "#8e8e93",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
  },
});

export default FriendsModal;
