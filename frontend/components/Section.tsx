import React from "react";
import { View, Text, StyleSheet } from "react-native";

type SectionProps = {
  title: string;
  items: string[];
  icon: React.ReactNode;
  color: string;
};

const Section: React.FC<SectionProps> = ({ title, items, icon, color }) => (
  <View style={[styles.sectionBox, { borderLeftColor: color }]}>
    <View style={styles.sectionHeader}>
      {icon}
      <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
    </View>
    {items.length === 0 ? (
      <Text style={styles.emptyText}>Keine Einträge</Text>
    ) : (
      items.map((item, idx) => {
        const [name, price] = item.split(";");
        return (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            key={idx}
          >
            <Text style={styles.itemText}>• {name.trim()}</Text>
            <Text style={styles.price}>{price ? price.trim() : ""}</Text>
          </View>
        );
      })
    )}
  </View>
);

const styles = StyleSheet.create({
  sectionBox: {
    backgroundColor: "#292929",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    width: "90%",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  itemText: {
    color: "#eee",
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 2,
    lineHeight: 22,
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    marginLeft: 8,
    marginBottom: 2,
  },
  price: {
    color: "#eee",
    fontSize: 16,
    lineHeight: 22,
  },
});

export default Section;
