import { getBrandList, getCarsList } from '@/lib/api/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CarsClient from './Cars.client';

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
    queryFn: () => getCarsList(brand, price, minMileage, maxMileage, page),
  });

  const [brands, carsForFilters] = await Promise.all([
    getBrandList(),
    getCarsList('', '', '', '', 1, 100),
  ]);

  const prices = [
    ...new Set(carsForFilters.cars.map((c) => c.rentalPrice)),
  ].sort((a, b) => Number(a) - Number(b));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient brands={brands} prices={prices} />
    </HydrationBoundary>
  );
}
