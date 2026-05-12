import { Car } from '@/app/types/car';
import css from './CarList.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={css.cars_list}>
      {cars.map((car) => {
        const [, city, country] = car.address.split(', ');

        return (
          <li key={car.id} className={css.car_list_item}>
            <div className={css.car_card_container}>
              <Image
                src={car.img}
                alt={car.brand}
                width={244}
                height={268}
                className={css.card_img}
              />

              <div className={css.car_info_container}>
                <div className={css.car_info}>
                  <p className={css.car_info_name}>
                    {car.brand}{' '}
                    <span className={css.car_info_model}>{car.model}</span>,{' '}
                    {car.year}
                  </p>

                  <p className={css.car_info_price}>${car.rentalPrice}</p>
                </div>

                <div className={css.car_meta_container}>
                  <div>
                    <p className={css.address}>
                      <span>{city}</span>, <span>{country}</span>
                    </p>

                    <p className={css.rental}>{car.rentalCompany}</p>
                  </div>

                  <div>
                    <p className={css.type}>{car.type}</p>

                    <p className={css.mileage}>{car.mileage}</p>
                  </div>
                </div>
              </div>
            </div>

            <Link href={`/cars/${car.id}`} className={css.car_list_btn}>
              Read more
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
