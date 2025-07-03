import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Faq = () => {
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
            FAQ
          </Text>
        </View>
        <Text style={styles.subHeader}>Was ist GoNomNom?</Text>
        <Text style={styles.text}>
          GoNomNom ist eine App, mit der du basierend auf deinen Vorlieben
          passende Restaurants in deiner Nähe entdeckst. Per einfachem Klick
          kannst du Restaurants liken und sie werden dann automatisch in deiner
          Favoritenliste gespeichert.
        </Text>
        <Text style={styles.subHeader}>
          Muss das Restaurant mich auch liken?
        </Text>
        <Text style={styles.text}>
          Nein. Restaurants können dich nicht liken. Ein Klick von dir genügt,
          und das Restaurant landet in deiner Favoritenliste.
        </Text>
        <Text style={styles.subHeader}>Kostet die App etwas?</Text>
        <Text style={styles.text}>
          Nein, GoNomNom ist komplett kostenlos und auf allen gängigen
          Plattformen verfügbar
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
  subHeader: {
    width: "100%",
    height: 30,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 40,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
    textAlign: "justify",
  },
});

export default Faq;
