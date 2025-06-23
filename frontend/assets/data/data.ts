import { images } from "@/constants/images";

export type Card = {
    id: number;
    name: string,
    cuisine: string,
    rating: number,
    distance: string,
    address: string,
    priceRange: string,
    image: any;
}

const data = [
    {
        id: 1,
        name: "La Bella Vista",
        cuisine: "Italienisch",
        rating: 4.8,
        distance: "0.8 km",
        address: "Friedrichsplatz 12, Mannheim",
        priceRange: "€€€",
        image: images.restaurantImage
    },
    {
        id: 2,
        name: "Sushi Palace",
        cuisine: "Japanisch",
        rating: 4.5,
        distance: "1.2 km",
        address: "Lange Rötterstraße 5, Mannheim",
        priceRange: "€€",
        image: images.restaurantImage2
    },
    {
        id: 3,
        name: "Curry House",
        cuisine: "Indisch",
        rating: 4.7,
        distance: "0.5 km",
        address: "Kaiserstraße 20, Mannheim",
        priceRange: "€€",
        image: images.restaurantImage3
    }
];

export default data;