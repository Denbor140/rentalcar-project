'use client';

import { getOneCar } from '@/app/api/api';
import css from './CarDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import LeaseForm from '@/components/LeaseForm/LeaseForm';

export default function CarDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: car } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getOneCar(id),
    refetchOnMount: false,
  });
  return (
    <div className={css.container}>
      <div>
        <Image
          src={`${car?.img}`}
          alt={`${car?.brand} ${car?.model}`}
          width={640}
          height={512}
          loading="eager"
        />
        {/* Форма оренди */}
        <LeaseForm />
      </div>

      {/* Блок із інфою машини */}
      <div>
        <div>
          <div>
            <h3>
              {car?.brand} {car?.model}, {car?.year}
            </h3>
            <p>Article: {car?.article}</p>
          </div>

          <div>
            <div>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-location"></use>
              </svg>
              <p>{car?.address}</p>
            </div>
            <p>{`$${car?.rentalPrice}`}</p>
          </div>
          <p>{car?.description}</p>
        </div>

        <div>
          <div>
            <h3>Rental Conditions: </h3>
            <ul>
              {car?.rentalConditions.map((condition) => (
                <li key={condition}>
                  <svg width={16} height={16}>
                    <use href="/sprite.svg#icon-check-circle"></use>
                  </svg>
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Car Specifications:</h3>
            <ul>
              <li>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-calendar"></use>
                </svg>
                Year: {car?.year}
              </li>
              <li>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-car"></use>
                </svg>
                Type: {car?.type}
              </li>
              <li>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-fuel-pump"></use>
                </svg>
                Fuel Consumption: {car?.fuelConsumption}
              </li>
              <li>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-gear"></use>
                </svg>
                Engine: {car?.engineSize}
              </li>
              <li>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-ph_road-horizon"></use>
                </svg>
                Mileage: {car?.mileage}
              </li>
            </ul>
          </div>

          <div>
            <h3>Features</h3>
            <ul>
              {(car?.accessories ?? [])
                .sort((a, b) => a.localeCompare(b))
                .map((accessorie) => (
                  <li key={accessorie}>
                    <svg width={16} height={16}>
                      <use href="/sprite.svg#icon-check-circle"></use>
                    </svg>
                    {accessorie}
                  </li>
                ))}

              {(car?.functionalities ?? [])
                .sort((a, b) => a.localeCompare(b))
                .map((functionalitie) => (
                  <li key={functionalitie}>
                    <svg width={16} height={16}>
                      <use href="/sprite.svg#icon-check-circle"></use>
                    </svg>
                    {functionalitie}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
