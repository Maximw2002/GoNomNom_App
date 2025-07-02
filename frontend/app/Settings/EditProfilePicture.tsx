import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { profilePictures } from "@/assets/data/data";
import ProfilePicture from "@/components/ProfilePicture";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditProfilePicture = () => {
  const router = useRouter();

  const handlePictureSelect = async (index: number) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const pictureName = index === 0 ? "generic" : index.toString();
      const picturePath = `http://localhost:3000/images/ProfilePictures/${pictureName}.png`;

      try {
        await updateDoc(userDocRef, {
          profilePicture: picturePath,
        });
        console.log("Profilbild erfolgreich aktualisiert!");
        router.back();
      } catch (error) {
        console.error("Fehler beim Aktualisieren des Profilbilds:", error);
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackTitle: "Profil",
          headerStyle: {
            backgroundColor: "#171717",
          },
          headerShadowVisible: false, // für Expo Router/React Navigation 6+
        }}
      />
      <View style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Wähle dein Profilbild
          </Text>
        </View>

        <FlatList
          data={profilePictures}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <ProfilePicture
              picture={item}
              index={index}
              onPress={handlePictureSelect}
              viewStyle={styles.pictureContainer}
              pictureStyle={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
          contentContainerStyle={{
            justifyContent: "center",
            height: 500,
          }}
        />
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
  },
  title: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
    marginTop: 10,
  },
  editProfilePictureContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    margin: 16,
    backgroundColor: "#222",
  },
});

export default EditProfilePicture;
