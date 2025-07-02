import { client, Databases } from "react-native-appwrite";
import { Platform } from "react-native";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  col:
  {
    user: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
    restaurants: process.env.EXPO_PUBLIC_APPWRITE_RESTAURANTS_COLLECTION_ID,
  }
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform

switch (Platform.OS) {
  case 'ios':
    client.setPlatform("com.gonomnom.app");
    break;
}

const database = new Databases(client);

export { database, config, client }