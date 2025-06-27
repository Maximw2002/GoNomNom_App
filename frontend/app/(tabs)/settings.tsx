import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const settings = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#171717",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>settings</Text>
    </SafeAreaView>
  );
};

export default settings;
