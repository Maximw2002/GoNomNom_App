import { Text, View } from "react-native";
import '../globals.css';
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold text-accent">Welcome!</Text>
      <Link href="/login">Login</Link>
      <Link href="/restaurant/Heids">Heids</Link>
    </View>
  );
}
 