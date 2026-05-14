import axios from 'axios';
import { Car } from '../types/car';

export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});

export interface FetchCarsListResponse {
  cars: Car[];
  totalPages: number;
}

export const getCarsList = async (
  brand: string,
  rentalPrice: string,
  minMileage: string,
  maxMileage: string,
  limit: number,
  page: number
) => {
  const { data } = await api.get<FetchCarsListResponse>('/cars', {
    params: {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
      limit: String(limit),
      page: String(page),
    },
  });
  return data;
};

export const getOneCar = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};

export const getBrandList = async () => {
  const { data } = await api.get<string[]>('/brands');
  return data;
};
