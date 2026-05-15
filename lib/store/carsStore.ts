import { create } from 'zustand';

interface CarsStore {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;

  setFilters: (
    brand: string,
    price: string,
    minMileage: string,
    maxMileage: string
  ) => void;
}

export const useCarsStore = create<CarsStore>((set) => ({
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',

  setFilters: (brand, price, minMileage, maxMileage) =>
    set({
      brand,
      price,
      minMileage,
      maxMileage,
    }),
}));
