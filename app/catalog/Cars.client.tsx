'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FetchCarsListResponse, getCarsList } from '../api/api';
import SearchBoxCar from '@/components/SearchBoxCar/SearchBoxCar';
import CarList from '@/components/CarList/CarList';

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

  const { data } = useQuery<FetchCarsListResponse>({
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
    <main>
      <section>
        <SearchBoxCar brands={brands} prices={prices} onChange={handleSearch} />
      </section>

      <section>
        {data && data.cars.length > 0 && <CarList cars={data?.cars} />}
      </section>
    </main>
  );
}
