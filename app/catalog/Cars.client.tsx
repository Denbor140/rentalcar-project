'use client';

import css from './page.module.css';
import { useState } from 'react';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { getCarsList } from '@/lib/api/api';
import SearchBoxCar from '@/components/SearchBoxCar/SearchBoxCar';
import CarList from '@/components/CarList/CarList';
import Loader from '@/components/Loader/Loader';
import { useCarsStore } from '@/lib/store/carsStore';

interface CarsClientProps {
  brands: string[];
  prices: string[];
}

export default function CarsClient({ brands, prices }: CarsClientProps) {
  const { brand, price, minMileage, maxMileage, setFilters } = useCarsStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
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
      retry: 1,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      throwOnError: true,
    });
  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  const hasCars = cars.length > 0;

  const handleSearch = (
    brand: string,
    price: string,
    min: string,
    max: string
  ) => {
    setFilters(brand, price, min, max);
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={` ${css.sections_container}`}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <section className={css.searchbox_container}>
                <SearchBoxCar
                  brands={brands}
                  prices={prices}
                  onChange={handleSearch}
                />
              </section>
              <section className={css.cars_list_container}>
                {hasCars && <CarList cars={cars} />}
              </section>

              {hasCars && hasNextPage && (
                <button
                  type="button"
                  className={css.load_more_btn}
                  onClick={() => fetchNextPage()}
                >
                  Load more
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
