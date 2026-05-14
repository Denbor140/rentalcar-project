'use client';

import css from './page.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FetchCarsListResponse, getCarsList } from '../api/api';
import SearchBoxCar from '@/components/SearchBoxCar/SearchBoxCar';
import CarList from '@/components/CarList/CarList';
import Loader from '@/components/Loader/Loader';

const limit = 12;

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

  const { data, isLoading } = useQuery<FetchCarsListResponse>({
    queryKey: ['cars', brand, price, minMeleage, maxMeleage, limit, page],
    queryFn: () =>
      getCarsList(brand, price, minMeleage, maxMeleage, limit, page),
    refetchOnMount: false,
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

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
    <div className={`${css.container} ${css.page_container}`}>
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
        </>
      )}
    </div>
  );
}
