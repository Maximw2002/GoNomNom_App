import { Image, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
            backgroundColor: "#171717", // schwarzer Hintergrund
            borderTopWidth: 0,
            height: 100,
            paddingTop: 25,
            paddingBottom: insets.bottom, // Add safe area padding to the bottom
          },
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarActiveTintColor: "#007AFF", // aktive Icon-Farbe
          tabBarInactiveTintColor: "#ffffff", // inaktive Icon-Farbe
          headerShown: false,
          tabBarShowLabel: false,
          animation: "shift",
          // Animation für den Tab-Wechsel
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <TabIcon color={color} icon={icons.favorites} size={50} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <TabIcon color={color} icon={icons.plus} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <TabIcon color={color} icon={icons.user} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default _layout;
