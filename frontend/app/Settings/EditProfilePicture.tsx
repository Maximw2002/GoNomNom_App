import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const EditProfilePicture = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackTitle: "Profil",
          headerStyle: { backgroundColor: "#171717" },
        }}
      />
      <View>
        <Text>User</Text>
      </View>
    </>
  );
};

export default EditProfilePicture;
