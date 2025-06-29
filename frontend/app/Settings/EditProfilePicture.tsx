import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { profilePictures } from "@/assets/data/data";
import ProfilePicture from "@/components/ProfilePicture";

const EditProfilePicture = () => {
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
          renderItem={({ item }) => (
            <ProfilePicture
              picture={item}
              index={profilePictures.indexOf(item)}
              onPress={(name) => console.log(`Profilbild ${name} ausgewählt`)}
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
