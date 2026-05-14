'use client';

import { getOneCar } from '@/app/api/api';
import css from './CarDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function CarDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: car } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getOneCar(id),
    refetchOnMount: false,
  });

  return (
    <main className={css.main}>
      <div className={css.container}>
        <Image
          src={`${car?.img}`}
          alt={`${car?.brand} ${car?.model}`}
          width={640}
          height={512}
          loading="eager"
        />
      </div>
    </main>
  );
}
