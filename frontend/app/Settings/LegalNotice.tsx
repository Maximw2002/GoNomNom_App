import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LegalNotice = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerBackTitle: "Profil",
          headerStyle: { backgroundColor: "#171717" },
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
            Impressum
          </Text>
        </View>
        <Text style={styles.subHeader}>GoNomNom App</Text>
        <Text style={styles.text}>
          Max Mustermann{"\n"}
          Musterstraße 12{"\n"}
          12345 Musterstadt{"\n"}
          Deutschland{"\n"}
          {"\n"}
          E-Mail: info@gonomnom.de{"\n"}
          Telefon: 01234 567890{"\n"}
          {"\n"}
          Verantwortlich gemäß § 5 TMG:
          {"\n"}
          Max Mustermann {"\n"}
          {"\n"}
          Umsatzsteuer-ID: DE123456789 {"\n"}
          Handelsregister: HRB 123456{"\n"}
          Registergericht: Amtsgericht Muster
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "flex-start",
    alignItems: "flex-start", // <-- linksbündig!
  },
  title: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
    marginTop: 10,
  },
  subHeader: {
    width: "100%",
    height: 30,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    paddingLeft: 10,
    marginTop: 40,
  },
  text: {
    justifyContent: "flex-start",
    color: "#fff",
    fontSize: 18,
    textAlign: "left",
    padding: 10,
  },
});

export default LegalNotice;
