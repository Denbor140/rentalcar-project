import { getOneCar } from '@/lib/api/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CarDetailsClient from './CarDetails.client';
import { notFound } from 'next/navigation';

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetails({ params }: CarDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const car = await queryClient.fetchQuery({
    queryKey: ['car', id],
    queryFn: () => getOneCar(id),
  });

  if (!car) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient id={id} />
    </HydrationBoundary>
  );
}
