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
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const brand = params?.searchForBrand ?? '';
  const price = params?.searchForPrice ?? '';
  const minMileage = params?.searchForMinMileage ?? '';
  const maxMileage = params?.searchForMaxMileage ?? '';

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', brand, price, minMileage, maxMileage],
    queryFn: ({ pageParam }) =>
      getCarsList(brand, price, minMileage, maxMileage, pageParam),
    initialPageParam: 1,
  });

  const [brands, carsForFilters] = await Promise.all([
    getBrandList(),
    getCarsList('', '', '', '', 1, 100),
  ]);

  const prices = [
    ...new Set((carsForFilters?.cars ?? []).map((c) => c.rentalPrice)),
  ].sort((a, b) => Number(a) - Number(b));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient brands={brands} prices={prices} />
    </HydrationBoundary>
  );
}
