import { images } from "@/constants/images";

export type Card = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  address: string;
  priceRange: string;
  image: any;
  description: string;
  starters: string[];
  mains: string[];
  drinks: string[];
  desserts: string[];
};

const data = [
  {
    id: 1,
    name: "La Bella Vista",
    cuisine: "Italienisch",
    rating: 4.8,
    distance: "0.8 km",
    address: "Friedrichsplatz 12, Mannheim",
    priceRange: "€€€",
    image: [
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
    ],
    description:
      "Genieße authentische italienische Küche mit frischen Zutaten und einer gemütlichen Atmosphäre im Herzen von Mannheim.",
    starters: [
      "Bruschetta mit Tomaten; 5,90 €",
      "Caprese Salat; 7,50 €",
      "Antipasti Misto; 8,90 €",
    ],
    mains: [
      "Pasta Carbonara; 12,90 €",
      "Pizza Margherita; 10,50 €",
      "Lasagne al Forno; 13,50 €",
    ],
    drinks: [
      "Hauswein Rot/Weiß; 4,50 €",
      "Espresso; 2,20 €",
      "San Pellegrino; 3,00 €",
    ],
    desserts: ["Tiramisu; 5,50 €", "Panna Cotta; 5,00 €", "Gelato; 4,00 €"],
  },
  {
    id: 2,
    name: "Sushi Palace",
    cuisine: "Japanisch",
    rating: 4.5,
    distance: "1.2 km",
    address: "Lange Rötterstraße 5, Mannheim",
    priceRange: "€€",
    image: [
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
    ],
    description:
      "Erlebe feinste Sushi-Kreationen und japanische Spezialitäten – frisch zubereitet und stilvoll serviert.",
    starters: ["Edamame; 4,50 €", "Miso Suppe; 3,90 €", "Gyoza; 5,90 €"],
    mains: [
      "Sushi Set Deluxe; 18,90 €",
      "Ramen mit Schweinefleisch; 13,50 €",
      "Teriyaki Lachs; 15,90 €",
    ],
    drinks: ["Grüner Tee; 2,50 €", "Asahi Bier; 4,20 €", "Sake; 5,00 €"],
    desserts: ["Mochi; 4,50 €", "Anmitsu; 5,00 €", "Matcha Eis; 4,00 €"],
  },
  {
    id: 3,
    name: "Curry House",
    cuisine: "Indisch",
    rating: 4.7,
    distance: "0.5 km",
    address: "Kaiserstraße 20, Mannheim",
    priceRange: "€€",
    image: [
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
    ],
    description:
      "Würzige Currys, hausgemachtes Naan und traditionelle indische Gerichte erwarten dich im Curry House.",
    starters: ["Samosas", "Pakoras", "Onion Bhaji"],
    mains: ["Butter Chicken", "Rindfleisch Vindaloo", "Gemüse Biryani"],
    drinks: ["Mango Lassi", "Indisches Bier", "Chai Tee"],
    desserts: ["Gulab Jamun", "Kheer", "Rasgulla"],
  },
  {
    id: 4,
    name: "Trattoria Roma",
    cuisine: "Italienisch",
    rating: 4.6,
    distance: "1.0 km",
    address: "Marktplatz 3, Mannheim",
    priceRange: "€€",
    image: [
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
    ],

    description:
      "Die Trattoria Roma bietet dir italienische Klassiker, leckere Pasta und eine familiäre Atmosphäre.",
    starters: [
      "Bruschetta al Pomodoro",
      "Carpaccio di Manzo",
      "Funghi Ripieni",
    ],
    mains: [
      "Spaghetti Aglio e Olio",
      "Risotto ai Funghi",
      "Pizza Prosciutto e Funghi",
    ],
    drinks: ["Chianti Classico", "Aperol Spritz", "Mineralwasser"],
    desserts: ["Tiramisu", "Panna Cotta", "Cannoli Siciliani"],
  },
  {
    id: 5,
    name: "Tokyo Sushi",
    cuisine: "Japanisch",
    rating: 4.4,
    distance: "2.0 km",
    address: "Schlossstraße 8, Mannheim",
    priceRange: "€€€",
    image: [
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
    ],
    description:
      "Modernes Ambiente trifft auf traditionelle Sushi-Kunst – entdecke die Vielfalt der japanischen Küche.",
    starters: ["Edamame", "Miso Suppe", "Gyoza"],
    mains: ["Sushi Set Deluxe", "Ramen mit Schweinefleisch", "Teriyaki Lachs"],
    drinks: ["Grüner Tee", "Asahi Bier", "Sake"],
    desserts: ["Mochi", "Anmitsu", "Matcha Eis"],
  },
  {
    id: 6,
    name: "Bombay Express",
    cuisine: "Indisch",
    rating: 4.3,
    distance: "1.5 km",
    address: "Augustaanlage 15, Mannheim",
    priceRange: "€",
    image: [
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
      images.restaurantImage3,
      images.restaurantImage,
      images.restaurantImage2,
    ],
    description:
      "Schnelle indische Küche mit aromatischen Gewürzen und beliebten Klassikern für den kleinen und großen Hunger.",
    starters: ["Samosas", "Pakoras", "Onion Bhaji"],
    mains: ["Butter Chicken", "Rindfleisch Vindaloo", "Gemüse Biryani"],
    drinks: ["Mango Lassi", "Indisches Bier", "Chai Tee"],
    desserts: ["Gulab Jamun", "Kheer", "Rasgulla"],
  },
];

export const kitchenTypes = [
  "Amerikanisch",
  "Chinesisch",
  "Indisch",
  "Japanisch",
  "Mexikanisch",
  "Arabisch",
  "Griechisch",
  "Italienisch",
  "Mediterran",
];

export const profilePictures = [
  images.profilePicture,
  images.profilePicture1,
  images.profilePicture2,
  images.profilePicture3,
  images.profilePicture4,
  images.profilePicture5,
];

export default data;
