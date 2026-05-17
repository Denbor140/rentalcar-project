export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: string;
  features: string[];
  location: {
    country: string;
    city: string;
    address: string;
  };
}

export interface CarWithArticle extends Car {
  article: string;
}
