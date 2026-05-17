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
import { PriceRange } from '../api/_utils/generatePriceOptions';

const PER_PAGE = 12;

interface CarsClientProps {
  brands: string[];
  price: PriceRange;
}

export default function CarsClient({ brands, price }: CarsClientProps) {
  const {
    brand,
    price: selectedPrice,
    minMileage,
    maxMileage,
    setFilters,
  } = useCarsStore();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['cars', brand, selectedPrice, minMileage, maxMileage],
      queryFn: ({ pageParam }) =>
        getCarsList(
          brand,
          Number(selectedPrice),
          Number(minMileage),
          Number(maxMileage),
          PER_PAGE,
          pageParam
        ),
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
              prices={price}
              onChange={handleSearch}
            />
          </section>
          {data && isFetching && !isFetchingNextPage ? (
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
