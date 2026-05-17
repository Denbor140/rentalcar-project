import { getCarsFilters, getCarsList } from '@/lib/api/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CarsClient from './Cars.client';
import { Metadata } from 'next';

const PER_PAGE = 12;

interface CatalogPageProps {
  searchParams?: {
    brand: string;
    price: string;
    minMileage: string;
    maxMileage: string;
  };
}

export async function generateMetadata({}): Promise<Metadata> {
  return {
    title: `Car catalog`,
    description: `Browse your car`,
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const brand = params?.brand ?? '';
  const price = params?.price ?? '';
  const minMileage = params?.minMileage ?? '';
  const maxMileage = params?.maxMileage ?? '';

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', brand, price, minMileage, maxMileage],
    queryFn: ({ pageParam }) =>
      getCarsList(
        brand,
        Number(price),
        Number(minMileage),
        Number(maxMileage),
        PER_PAGE,
        pageParam
      ),
    initialPageParam: 1,
  });

  const { brands, price: priceRange } = await getCarsFilters();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient brands={brands} price={priceRange} />
    </HydrationBoundary>
  );
}
