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
    <View style={styles.Container}>
      <Header title="Profil" back={false} />
      <View style={styles.settingsWrapper}>
        <SettingsButton
          name="Benutzerprofil"
          onPress={() => router.push("/Settings/User")}
          buttonStyle={styles.settingsButton}
          textStyle={styles.settingsButtonText}
          icon={icons.right}
        />
        <SettingsButton
          name="FAQ"
          onPress={() => router.push("/Settings/Faq")}
          buttonStyle={styles.settingsButton}
          textStyle={styles.settingsButtonText}
          icon={icons.right}
        />
        <SettingsButton
          name="Impressum"
          onPress={() => router.push("/Settings/LegalNotice")}
          buttonStyle={styles.settingsButton}
          textStyle={styles.settingsButtonText}
          icon={icons.right}
        />
        <SettingsButton
          name="AGBs"
          onPress={() => router.push("/Settings/Agbs")}
          buttonStyle={styles.settingsButton}
          textStyle={styles.settingsButtonText}
          icon={icons.right}
        />
        <SettingsButton
          name="Abmelden"
          onPress={() => getAuth().signOut()}
          buttonStyle={styles.logoutButton}
          textStyle={styles.settingsButtonText}
          icon={icons.logout}
          buttonColor="#FF0101"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    height: 50,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    marginHorizontal: 5,
    shadowColor: "#929291",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    // Schatten für Android
    elevation: 8,
    borderWidth: 0.5,
    borderColor: "#333",
  },
  logoutButton: {
    height: 50,
    width: 200,
    backgroundColor: "#FF0101",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    marginTop: 120,
    marginHorizontal: 5,
    // Schatten für Android
    elevation: 8,
    borderWidth: 0.5,
    borderColor: "#333",
  },
  settingsButtonSelected: {
    backgroundColor: "#007AFF",
  },
  settingsButtonText: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default settings;
