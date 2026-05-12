import { getCarsList } from '../api/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CarsClient from './Cars.client';

const limit = 12;

interface CatalogPageProps {
  searchParams?: {
    searchForBrand: string;
    searchForPrice: string;
    searchForMinMileage: string;
    searchForMaxMileage: string;
    page: number;
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const brand = params?.searchForBrand ?? '';
  const price = params?.searchForPrice ?? '';
  const minMileage = params?.searchForMinMileage ?? '';
  const maxMileage = params?.searchForMaxMileage ?? '';
  const page = params?.page ?? 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cars', brand, price, minMileage, maxMileage, page],
    queryFn: () =>
      getCarsList(brand, price, minMileage, maxMileage, limit, page),
  });

  const carsForFilters = await getCarsList('', '', '', '', 1000, 1);
  const brands = [...new Set(carsForFilters.cars.map((c) => c.brand))].sort(
    (a, b) => a.localeCompare(b)
  );
  const prices = [
    ...new Set(carsForFilters.cars.map((c) => c.rentalPrice)),
  ].sort((a, b) => Number(a) - Number(b));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient
        brands={brands}
        prices={prices}
        clientMinMeleage={minMileage}
        clientMaxMeleage={maxMileage}
      />
    </HydrationBoundary>
  );
}
