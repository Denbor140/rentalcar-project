'use client';

import { getOneCar } from '@/lib/api/api';
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
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.section_container}>
          <div className={css.car_lease_container}>
            <Image
              className={css.car_img}
              src={`${car?.img}`}
              alt={`${car?.brand} ${car?.model}`}
              width={640}
              height={512}
              loading="eager"
            />
            <LeaseForm />
          </div>
          <div className={css.car_details_container}>
            <div className={css.car_details_wrapper}>
              <div className={css.car_title_wrapper}>
                <h3 className={css.car_title}>
                  {car?.brand} {car?.model}, {car?.year}
                </h3>
                <p className={css.car_article}>Article: {car?.article}</p>
              </div>
              <div className={css.car_address_wrapper}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-location"></use>
                </svg>
                <p className={css.car_address}>{car?.address}</p>
              </div>
              <p className={css.car_price}>{`$${car?.rentalPrice}`}</p>
              <p className={css.car_descr}>{car?.description}</p>
            </div>
            <div className={css.car_info_container}>
              <div className={css.rental_conditions_wrapper}>
                <h3 className={css.car_rental_title}>Rental Conditions: </h3>
                <ul className={css.car_condition_list}>
                  {car?.rentalConditions.map((condition) => (
                    <li key={condition} className={css.car_condition_item}>
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-check-circle"></use>
                      </svg>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={css.car_specifications_wrapper}>
                <h3 className={css.car_specification_title}>
                  Car Specifications:
                </h3>
                <ul className={css.car_specifications_list}>
                  <li className={css.car_specification_item}>
                    <svg width={16} height={16}>
                      <use href="/sprite.svg#icon-calendar"></use>
                    </svg>
                    Year: {car?.year}
                  </li>
                  <li className={css.car_specification_item}>
                    <svg width={16} height={16}>
                      <use href="/sprite.svg#icon-car"></use>
                    </svg>
                    Type: {car?.type}
                  </li>
                  <li className={css.car_specification_item}>
                    <svg width={16} height={16}>
                      <use href="/sprite.svg#icon-fuel-pump"></use>
                    </svg>
                    Fuel Consumption: {car?.fuelConsumption}
                  </li>
                  <li className={css.car_specification_item}>
                    <svg width={16} height={16}>
                      <use href="/sprite.svg#icon-gear"></use>
                    </svg>
                    Engine: {car?.engineSize}
                  </li>
                  <li className={css.car_specification_item}>
                    <svg width={16} height={16}>
                      <use href="/sprite.svg#icon-ph_road-horizon"></use>
                    </svg>
                    Mileage: {car?.mileage}
                  </li>
                </ul>
              </div>
              <div className={css.car_features_wrapper}>
                <h3 className={css.car_features_title}>Features</h3>
                <ul className={css.car_features_list}>
                  {(car?.accessories ?? [])
                    .sort((a, b) => a.localeCompare(b))
                    .map((accessorie) => (
                      <li key={accessorie} className={css.car_accessorie_item}>
                        <svg width={16} height={16}>
                          <use href="/sprite.svg#icon-check-circle"></use>
                        </svg>
                        {accessorie}
                      </li>
                    ))}
                  {(car?.functionalities ?? [])
                    .sort((a, b) => a.localeCompare(b))
                    .map((functionalitie) => (
                      <li
                        key={functionalitie}
                        className={css.car_functionalitie_item}
                      >
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
      </div>
    </main>
  );
}
