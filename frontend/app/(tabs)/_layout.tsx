import { Image, View, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const TabIcon = ({ color, icon, size = 40 }: any) => {
  return (
    <Image
      source={icon}
      style={{
        width: size,
        height: size,
        tintColor: color,
      }}
      resizeMode="contain"
    />
  );
};

const _layout = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#171717" }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            height: 85,
            paddingTop: 5,
            paddingBottom: insets.bottom, // Add safe area padding to the bottom
            backgroundColor: "transparent",
          },
          tabBarBackground: () => (
            <BlurView
              intensity={90}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ),
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarActiveTintColor: "#007AFF", // aktive Icon-Farbe
          tabBarInactiveTintColor: "#ffffff", // inaktive Icon-Farbe
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            marginTop: 5, // Adjust this value to increase/decrease the space
          },
          animation: "shift",
          // Animation für den Tab-Wechsel
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favoriten",
            tabBarIcon: ({ color }) => (
              <TabIcon color={color} icon={icons.favorites} size={40} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Matches",
            tabBarIcon: ({ color }) => (
              <TabIcon color={color} icon={icons.plus} size={30} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Profil",
            tabBarIcon: ({ color }) => (
              <TabIcon color={color} icon={icons.user} size={30} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default _layout;
