import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCjAafI7gjAsbreR8eOLCLtZySrD5ISOKY",
  authDomain: "gonomnom-c1049.firebaseapp.com",
  projectId: "gonomnom-c1049",
  storageBucket: "gonomnom-c1049.firebasestorage.app",
  messagingSenderId: "261883929672",
  appId: "1:261883929672:web:762d8c176ea2d86b24a47d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const addRestaurants = async () => {
await setDoc(doc(db, "restaurants", "restaurant-continent-karlsruhe"), {
  address: "Kaiserstraße 109, Karlsruhe",
  cuisine: "Indisch",
  description: "Würzige Currys, frisch gebackenes Naan und traditionelle indische Küche im Herzen von Karlsruhe.",
  distance: "0.8 km",
  name: "Restaurant Continent",
  priceRange: "€",
  rating: 3,
  starters: [
    "Samosa; 3,90 €",
    "Linsensuppe; 4,20 €",
    "Pakora; 4,50 €"
  ],
  mains: [
    "Chicken Tikka Masala; 11,50 €",
    "Palak Paneer; 10,20 €",
    "Lamm Vindaloo; 12,00 €"
  ],
  desserts: [
    "Gulab Jamun; 3,50 €",
    "Kheer (Reispudding); 3,90 €",
    "Mango Lassi Eis; 4,20 €"
  ],
  drinks: [
    "Mango Lassi; 3,00 €",
    "Masala Chai; 2,80 €",
    "Kingfisher Bier; 4,00 €"
  ],
  images: [
    "http://localhost:3000/images/indisch1.png",
    "http://localhost:3000/images/indisch2.png",
    "http://localhost:3000/images/indisch3.png"
  ],
  reviews: [
    "fGh8KjT5Mn3LzVq9Pu",
    "oWeRtzXcVb12345678",
    "ZxCvBnMlKjHgFdSaQw"
  ]
});

await setDoc(doc(db, "restaurants", "el-taquito-karlsruhe"), {
  address: "Waldstraße 24-26, Karlsruhe",
  cuisine: "Mexikanisch",
  description: "Genieße echte mexikanische Küche mit würzigen Tacos, Burritos und Tequila in lebhafter Atmosphäre.",
  distance: "0.1 km",
  name: "El Taquito",
  priceRange: "€€",
  rating: 4,
  starters: [
    "Nachos con Salsa; 5,00 €",
    "Guacamole mit Chips; 4,80 €",
    "Queso Fundido; 5,20 €"
  ],
  mains: [
    "Tacos al Pastor; 10,90 €",
    "Burrito Carne; 11,50 €",
    "Quesadillas Vegetarisch; 9,80 €"
  ],
  desserts: [
    "Churros mit Schokosauce; 4,50 €",
    "Flan; 4,20 €",
    "Tres Leches Kuchen; 4,80 €"
  ],
  drinks: [
    "Margarita; 6,00 €",
    "Horchata; 3,00 €",
    "Corona Bier; 4,20 €"
  ],
  images: [
    "http://localhost:3000/images/mexikanisch1.png",
    "http://localhost:3000/images/mexikanisch2.png",
    "http://localhost:3000/images/mexikanisch3.png"
  ],
  reviews: [
    "M2n4XyTzBvQ9wLsDgK",
    "LqK3pRzNjT1YxCwV78"
  ]
});

await setDoc(doc(db, "restaurants", "soki-garden-karlsruhe"), {
  address: "Waldstraße 24-28, Karlsruhe",
  cuisine: "Japanisch",
  description: "Erlebe frisches Sushi, traditionelle Ramen und japanische Spezialitäten in stilvollem Ambiente mitten in Karlsruhe.",
  distance: "0.1 km",
  name: "Soki Garden",
  priceRange: "€€",
  rating: 5,
  starters: [
    "Edamame; 4,90 €",
    "Miso Suppe; 3,50 €",
    "Gyoza; 5,20 €"
  ],
  mains: [
    "Sushi Mix Teller; 13,90 €",
    "Ramen mit Schweinebauch; 12,50 €",
    "Udon mit Gemüse; 11,00 €"
  ],
  desserts: [
    "Mochi Eis; 4,00 €",
    "Matcha Tiramisu; 5,50 €",
    "Dorayaki; 4,50 €"
  ],
  drinks: [
    "Grüner Tee; 2,50 €",
    "Asahi Bier; 4,00 €",
    "Sake; 5,00 €"
  ],
  images: [
    "http://localhost:3000/images/japanisch1.png",
    "http://localhost:3000/images/japanisch2.png",
    "http://localhost:3000/images/japanisch3.png"
  ],
  reviews: [
    "a1b2c3d4e5f6g7h8i9",
    "nZ7XwQ123xyzAbCdEf",
    "ZZzYyXxWwVvUuTt123"
  ]
});

await setDoc(doc(db, "restaurants", "aposto-karlsruhe"), {
  address: "Waldstraße 57, Karlsruhe",
  cuisine: "Italienisch",
  description: "Traditionelle italienische Küche mit hausgemachter Pasta und familiärem Flair.",
  distance: "0.5 km",
  name: "Aposto",
  priceRange: "€€",
  rating: 4,
  starters: [
    "Caprese; 6,20 €",
    "Bruschetta; 5,50 €",
    "Antipasti Teller; 7,00 €"
  ],
  mains: [
    "Spaghetti Carbonara; 12,90 €",
    "Pizza Diavola; 11,50 €",
    "Risotto ai Funghi; 13,00 €"
  ],
  desserts: [
    "Tiramisu; 5,50 €",
    "Panna Cotta; 5,00 €",
    "Gelato Misto; 4,80 €"
  ],
  drinks: [
    "Hauswein; 4,50 €",
    "Espresso; 2,20 €",
    "San Pellegrino; 3,00 €"
  ],
  images: [
    "http://localhost:3000/images/italienisch1.png",
    "http://localhost:3000/images/italienisch2.png",
    "http://localhost:3000/images/italienisch3.png"
  ],
  reviews: [
    "xYz123TgF9kLpOeRt",
    "T7Gf9xYz123OpLkQw"
  ]
});

await setDoc(doc(db, "restaurants", "omonia-karlsruhe"), {
  address: "Passagehof 24, Karlsruhe",
  cuisine: "Griechisch",
  description: "Genieße mediterrane Klassiker wie Gyros, Moussaka und frische Meze-Platten.",
  distance: "0.6 km",
  name: "Omonia",
  priceRange: "€€",
  rating: 4,
  starters: [
    "Tzatziki mit Brot; 4,20 €",
    "Feta Saganaki; 5,50 €",
    "Dolmadakia; 4,80 €"
  ],
  mains: [
    "Gyros mit Reis; 11,50 €",
    "Moussaka; 12,00 €",
    "Bifteki; 11,80 €"
  ],
  desserts: [
    "Griechischer Joghurt mit Honig und Nüssen; 4,00 €",
    "Baklava; 4,50 €",
    "Loukoumades; 4,20 €"
  ],
  drinks: [
    "Retsina; 4,00 €",
    "Mythos Bier; 3,80 €",
    "Ouzo; 2,50 €"
  ],
  images: [
    "http://localhost:3000/images/griechisch1.png",
    "http://localhost:3000/images/griechisch2.png",
    "http://localhost:3000/images/griechisch3.png"
  ],
  reviews: [
    "usergr1A23",
    "hellasRater22"
  ]
});

await setDoc(doc(db, "restaurants", "yangda-karlsruhe"), {
  address: "Kaiserstraße 114, Karlsruhe",
  cuisine: "Chinesisch",
  description: "Traditionelle chinesische Küche mit Dim Sum, gebratenen Nudeln und würzigen Spezialitäten.",
  distance: "0.3 km",
  name: "Yangda",
  priceRange: "€",
  rating: 3,
  starters: [
    "Frühlingsrollen; 3,90 €",
    "Wan Tan Suppe; 4,50 €",
    "Süß-saure Gurken; 3,80 €"
  ],
  mains: [
    "Gebratene Nudeln mit Huhn; 9,80 €",
    "Kung Pao Chicken; 10,20 €",
    "Tofu mit Gemüse; 8,90 €"
  ],
  desserts: [
    "Gebackene Banane mit Honig; 3,50 €",
    "Sesambällchen; 3,80 €",
    "Mango Pudding; 4,00 €"
  ],
  drinks: [
    "Jasmintee; 2,20 €",
    "Tsingtao Bier; 3,90 €",
    "Pflaumenwein; 4,00 €"
  ],
  images: [
    "http://localhost:3000/images/chinesisch1.png",
    "http://localhost:3000/images/chinesisch2.png",
    "http://localhost:3000/images/chinesisch3.png"
  ],
  reviews: [
    "chinUser8xyZ",
    "dragonFan2025"
  ]
});

await setDoc(doc(db, "restaurants", "the-last-meal-bbq-karlsruhe"), {
  address: "Kriegsstraße 23, Karlsruhe",
  cuisine: "Amerikanisch",
  description: "Ein echtes Diner-Erlebnis mit saftigem BBQ, Ribs und Milkshakes im 50er-Jahre-Stil.",
  distance: "1.0 km",
  name: "The Last Meal BBQ",
  priceRange: "€€",
  rating: 4,
  starters: [
    "Chicken Wings; 6,00 €",
    "Mozzarella Sticks; 5,50 €",
    "Onion Rings; 5,00 €"
  ],
  mains: [
    "Cheeseburger mit Pommes; 11,00 €",
    "BBQ Ribs; 14,50 €",
    "Vegan Burger; 10,50 €"
  ],
  desserts: [
    "Brownie mit Eis; 4,80 €",
    "Apple Pie; 4,50 €",
    "Cheesecake; 5,00 €"
  ],
  drinks: [
    "Vanilla Milkshake; 3,90 €",
    "Coca Cola; 2,50 €",
    "Budweiser Bier; 4,00 €"
  ],
  images: [
    "http://localhost:3000/images/amerikanisch1.png",
    "http://localhost:3000/images/amerikanisch2.png",
    "http://localhost:3000/images/amerikanisch3.png"
  ],
  reviews: [
    "samUSAfan1",
    "route66Rater"
  ]
});

await setDoc(doc(db, "restaurants", "la-rose-karlsruhe"), {
  address: "Akademiestraße 32, Karlsruhe",
  cuisine: "Syrisch",
  description: "Authentische syrische Küche mit hausgemachten Mezze, würzigen Grillgerichten und süßen Desserts.",
  distance: "0.2 km",
  name: "La Rose",
  priceRange: "€",
  rating: 5,
  starters: [
    "Muhammara mit Fladenbrot; 4,80 €",
    "Fattoush Salat; 5,20 €",
    "Hummus mit Olivenöl; 4,50 €"
  ],
  mains: [
    "Mixed Grill Teller (Huhn, Lamm, Kafta); 13,90 €",
    "Maklouba mit Aubergine und Huhn; 11,50 €",
    "Vegane Kichererbsenpfanne; 9,80 €"
  ],
  desserts: [
    "Halawat al-Jibn (Grießrolle mit Käsefüllung); 4,50 €",
    "Ma’amoul (Dattelkekse); 3,00 €",
    "Baklava; 4,20 €"
  ],
  drinks: [
    "Jallab (Dattel-Getränk); 2,80 €",
    "Arabischer Mokka; 2,50 €",
    "Granatapfelsaft; 3,50 €"
  ],
  images: [
    "http://localhost:3000/images/syrisch1.png",
    "http://localhost:3000/images/syrisch2.png",
    "http://localhost:3000/images/syrisch3.png"
  ],
  reviews: [
    "syrFan345LMNp",
    "qWeRtY2025zZ"
  ]
});


}

console.log("Restaurant hinzugefügt!");

addRestaurants().catch(console.error);