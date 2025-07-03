import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import SettingsButton from "../../components/SettingsButton";
import { useRouter } from "expo-router";
import { icons } from "../../constants/icons";
import { getAuth } from "firebase/auth";

const settings = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/Authentication/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <View style={styles.container}>
      <Header title="Profil" back={false} />
      <View style={styles.contentContainer}>
        {/* Navigation Group */}
        <View style={styles.settingsGroup}>
          <SettingsButton
            name="Benutzerprofil"
            onPress={() => router.push("/Settings/User")}
            buttonStyle={styles.settingsButton}
            textStyle={styles.settingsButtonText}
            icon={icons.right}
          />
          <View style={styles.separator} />
          <SettingsButton
            name="FAQ"
            onPress={() => router.push("/Settings/Faq")}
            buttonStyle={styles.settingsButton}
            textStyle={styles.settingsButtonText}
            icon={icons.right}
          />
          <View style={styles.separator} />
          <SettingsButton
            name="Impressum"
            onPress={() => router.push("/Settings/LegalNotice")}
            buttonStyle={styles.settingsButton}
            textStyle={styles.settingsButtonText}
            icon={icons.right}
          />
          <View style={styles.separator} />
          <SettingsButton
            name="AGBs"
            onPress={() => router.push("/Settings/Agbs")}
            buttonStyle={styles.settingsButton}
            textStyle={styles.settingsButtonText}
            icon={icons.right}
          />
        </View>

        {/* Logout Group */}
        <View style={styles.logoutGroup}>
          <SettingsButton
            name="Abmelden"
            onPress={() => getAuth().signOut()}
            buttonStyle={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717", // Darker background for the whole screen
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
    paddingHorizontal: 20,
  },
  settingsGroup: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    marginBottom: 30,
    overflow: "hidden", // This will clip the highlight to the container's rounded corners
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "transparent", // No background color for the button itself
  },
  settingsButtonText: {
    color: "#fff",
    fontSize: 17,
    flex: 1, // Take up available space
  },
  separator: {
    height: 1,
    backgroundColor: "#3a3a3c",
    marginLeft: 15,
  },
  logoutGroup: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    overflow: "hidden", // Also clip the highlight for the logout button
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the text
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
  },
  logoutButtonText: {
    color: "#ff453a", // Red color for logout
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default settings;
