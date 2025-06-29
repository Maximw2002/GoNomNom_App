import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Agbs = () => {
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
            AGBs
          </Text>
        </View>
        <Text style={styles.subHeader}>Allgemeine Geschäftsbedingungen</Text>

        <Text style={styles.text}>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung
          der GoNomNom App. Mit der Nutzung der App erklären Sie sich mit diesen
          AGB einverstanden.
        </Text>
        <Text style={styles.subHeader}>1. Nutzung der App</Text>
        <Text style={styles.text}>
          Die GoNomNom App ist kostenlos und ermöglicht es Ihnen, Restaurants in
          Ihrer Nähe zu entdecken und zu bewerten. Die Nutzung erfolgt auf
          eigene Gefahr.
        </Text>
        <Text style={styles.subHeader}>2. Registrierung</Text>
        <Text style={styles.text}>
          Für die Nutzung ist keine Registrierung erforderlich. Alle Funktionen
          stehen kostenlos zur Verfügung.
        </Text>
        <Text style={styles.subHeader}>3. Favoriten-Funktion</Text>
        <Text style={styles.text}>
          Restaurants, die du likest, werden lokal auf deinem Gerät gespeichert.
          Es erfolgt kein Datenabgleich mit Restaurants oder Dritten.
        </Text>
        <Text style={styles.subHeader}>4. Inhalte und Haftung</Text>
        <Text style={styles.text}>
          Alle Informationen (z. B. Restaurantdaten) stammen aus öffentlichen
          Quellen. Wir übernehmen keine Garantie für Richtigkeit oder
          Aktualität.
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
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    padding: 10,
    textAlign: "justify",
  },
});

export default Agbs;
