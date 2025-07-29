export type ImageDetails = {
  suffix: string;
  count: number;
  prefix: string;
};

// For HotelReviews
export interface AmenityRating {
  name: string;
  score: number;
}

export interface TrustYouScore {
  score: {
    overall?: number | null;
    [key: string]: number | null | undefined;
  };
}

// Optional: used for props in HotelSurroundings
export interface Surrounding {
  type: string;
  name: string;
  distance: string;
  latitude: number;
  longitude: number;
}
