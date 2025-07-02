export interface Restaurant {
  id: number;
  name: string;
  adult: boolean;
  kitchen_ids: number[];
  address: string;
  price: string;
  rating: number;
  menu: string;
  backdrop_path: string;
}

export interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Card {
  id: string; // Firestore liefert string IDs
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  address: string;
  priceRange: string;
  images: any;
  description: string;
  starters: string[];
  mains: string[];
  drinks: string[];
  desserts: string[];
}

export interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  profilePicture?: string;
  favorites: string[];
  friendIds: string[];
  password?: string;
  cuisinePref: string[];
  pricePref: string;
}
