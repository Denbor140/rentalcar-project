import { getOneCar } from '@/lib/api/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CarDetailsClient from './CarDetails.client';

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetails({ params }: CarDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => getOneCar(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
}
