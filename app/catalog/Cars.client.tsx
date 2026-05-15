'use client';

import css from './page.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCarsList } from '../api/api';
import SearchBoxCar from '@/components/SearchBoxCar/SearchBoxCar';
import CarList from '@/components/CarList/CarList';
import Loader from '@/components/Loader/Loader';

interface CarsClientProps {
  brands: string[];
  prices: string[];
  clientMinMeleage: string;
  clientMaxMeleage: string;
}

export default function CarsClient({
  brands,
  prices,
  clientMinMeleage,
  clientMaxMeleage,
}: CarsClientProps) {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMeleage, setMinMileage] = useState(clientMinMeleage);
  const [maxMeleage, setMaxMileage] = useState(clientMaxMeleage);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['cars', brand, price, minMeleage, maxMeleage, page],
    queryFn: () => getCarsList(brand, price, minMeleage, maxMeleage, page),
    refetchOnMount: false,
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const totalPages = data?.totalPages ?? 0;
  const hasMorePages = page < totalPages;
  const cars = data?.cars ?? [];
  const hasCars = cars.length > 0;

  const handleSearch = (
    brand: string,
    price: string,
    min: string,
    max: string
  ) => {
    setBrand(brand);
    setPrice(price);
    setMinMileage(min);
    setMaxMileage(max);

    setPage(1);
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
                {data && data.cars.length > 0 && <CarList cars={data?.cars} />}
              </section>

              {hasCars && hasMorePages && (
                <button type="button" className={css.load_more_btn}>
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
