import { View, Text, Image, Pressable, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import { StyleSheet } from "react-native";
import images from "@/constants/images";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import DeleteAccModal from "@/components/Modals/DeleteAccModal";

const User = () => {
  const router = useRouter();

  const imgScale = useSharedValue(1);
  const iconColor = useSharedValue("#fff");
  const imgAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imgScale.value }],
  }));
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: iconColor.value,
  }));

  const [deleteAccModalVisible, setDeleteAccModalVisible] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Benutzereinstellungen",
          headerBackTitle: "Profil",
          headerStyle: { backgroundColor: "#171717" },
          headerTitleStyle: { color: "#fff" }, // Header-Hintergrundfarbe und Textfarbe
        }}
      />
      <View style={styles.container}>
        <View style={styles.editProfilePictureContainer}>
          <Image
            source={images.profilePicture}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Pressable
            onPressIn={() => {
              imgScale.value = withTiming(0.8, { duration: 200 });
              iconColor.value = withTiming("#007AFF", { duration: 200 }); // Vergrößern bei Berührung
            }}
            onPressOut={() => {
              imgScale.value = withTiming(1, { duration: 200 });
              iconColor.value = withTiming("#fff", { duration: 200 }); // Vergrößern bei Berührung
              // Zurücksetzen bei Loslassen
            }}
            onPress={() => router.push("/Settings/EditProfilePicture")}
          >
            <Animated.Image
              source={icons.edit}
              style={[
                {
                  width: 30,
                  height: 30,
                },
                imgAnimatedStyle,
                iconAnimatedStyle,
              ]}
            />
          </Pressable>
        </View>
        <View style={styles.userDataContainer}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "bold",
              paddingLeft: 10,
            }}
          >
            Username
          </Text>
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#333" // etwas heller als #262626
            onPress={() => console.log("Username pressed")}
            style={styles.userData}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>MaximW</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.userDataContainer}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "bold",
              paddingLeft: 10,
            }}
          >
            E-Mail
          </Text>

          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#333" // etwas heller als #262626
            onPress={() => console.log("E-Mail pressed")}
            style={styles.userData}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              maximw@gmail.com
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.userDataContainer}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "bold",
              paddingLeft: 10,
            }}
          >
            Passwort
          </Text>
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#333" // etwas heller als #262626
            onPress={() => console.log("Password pressed")}
            style={styles.userData}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              **********
            </Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="#c62828" // etwas dunkler als #FF0101 für schönes Feedback
          onPress={() => {
            console.log("Account deleted");
            setDeleteAccModalVisible(true);
          }}
          style={styles.deleteAccContainer}
        >
          <View>
            <Text
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              Konto löschen
            </Text>
          </View>
        </TouchableHighlight>

        <View>
          <DeleteAccModal
            visible={deleteAccModalVisible}
            onClose={() => setDeleteAccModalVisible(false)}
            // Hier Logik zum Löschen des Kontos hinzufügen
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userDataContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteAccContainer: {
    width: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FF0101",
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  editProfilePictureContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 140,
    marginVertical: 80,
  },
  userData: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#262626",
    borderRadius: 7,
    marginBottom: 20,
    height: 38,
  },
  userDataHighlight: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#333",
    borderRadius: 7,
    marginBottom: 20,
    height: 38,
  },
});

export default User;
