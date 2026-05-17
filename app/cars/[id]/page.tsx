import { getOneCar } from '@/lib/api/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CarDetailsClient from './CarDetails.client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getOneCar(id);

  return {
    title: `Car ${car?.brand} ${car?.model} ${car?.year}`,
    description: car?.description,
  };
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
