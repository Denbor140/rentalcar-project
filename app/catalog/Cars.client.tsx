'use client';

import css from './page.module.css';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getCarsList } from '@/lib/api/api';
import SearchBoxCar from '@/components/SearchBoxCar/SearchBoxCar';
import CarList from '@/components/CarList/CarList';
import Loader from '@/components/Loader/Loader';
import { useCarsStore } from '@/lib/store/carsStore';
import { useEffect } from 'react';

interface CarsClientProps {
  brands: string[];
  prices: string[];
}

export default function CarsClient({ brands, prices }: CarsClientProps) {
  const { brand, price, minMileage, maxMileage, setFilters } = useCarsStore();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['cars', brand, price, minMileage, maxMileage],
      queryFn: ({ pageParam }) =>
        getCarsList(brand, price, minMileage, maxMileage, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
      refetchOnMount: false,
      retry: false,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      throwOnError: false,
    });

  useEffect(() => {
    setFilters(brand, price, minMileage, maxMileage);
  }, [brand, price, minMileage, maxMileage, setFilters]);

  const handleSearch = (
    brand: string,
    price: string,
    min: string,
    max: string
  ) => {
    queryClient.removeQueries({
      queryKey: ['cars'],
    });

    setFilters(brand, price, min, max);
  };

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  const hasCars = cars.length > 0;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.sections_container}>
          <section className={css.searchbox_container}>
            <SearchBoxCar
              brands={brands}
              prices={prices}
              onChange={handleSearch}
            />
          </section>
          {isFetching && !isFetchingNextPage && data ? (
            <Loader />
          ) : (
            <section className={css.cars_list_container}>
              <CarList cars={cars} />
            </section>
          )}

          {hasCars && hasNextPage && (
            <div className={css.load_more_container}>
              {isFetchingNextPage ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  className={css.load_more_btn}
                  onClick={() => fetchNextPage()}
                >
                  Load more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
