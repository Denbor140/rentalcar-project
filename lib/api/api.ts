import axios from 'axios';
import { Car, CarWithArticle } from '@/app/types/car';
import { getArticleCar } from '@/app/api/_utils/getArticleCar';

export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});

export interface FetchCarsListResponse {
  cars: Car[];
  totalPages: number;
  page: number;
}

export const getCarsList = async (
  brand: string,
  rentalPrice: string,
  minMileage: string,
  maxMileage: string,
  page: number,
  limit = 12
) => {
  const { data } = await api.get<FetchCarsListResponse>('/cars', {
    params: {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
      page,
      limit,
    },
  });

  return data;
};

export const getOneCar = async (id: string): Promise<CarWithArticle | null> => {
  try {
    const { data } = await api.get<Car>(`/cars/${id}`);

    return {
      ...data,
      article: getArticleCar(data.img),
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return null;
    }

    throw err;
  }
};

export const getBrandList = async () => {
  const { data } = await api.get<string[]>('/brands');
  return data;
};
