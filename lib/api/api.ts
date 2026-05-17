import axios from 'axios';
import { Car, CarWithArticle } from '@/app/types/car';
import { getArticleCar } from '@/app/api/_utils/getArticleCar';

export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});

export interface FetchCarsListResponse {
  cars: Car[];
  totalPages: number;
  page: number;
}

interface CarsFiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export const getCarsList = async (
  brand: string,
  price: number,
  minMileage: number,
  maxMileage: number,
  perPage: number,
  page: number
) => {
  const { data } = await api.get<FetchCarsListResponse>('/cars', {
    params: {
      ...(brand && { brand }),
      ...(price && { price }),
      ...(minMileage && { minMileage }),
      ...(maxMileage && { maxMileage }),
      perPage,
      page,
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

export const getCarsFilters = async () => {
  const { data } = await api.get<CarsFiltersResponse>('/cars/filters');
  return data;
};
