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
      {cars.map((car) => (
        <li key={car.id} className={css.car_list_item}>
          <div className={css.car_card_container}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model} ${car.year}`}
              width={244}
              height={268}
              className={css.card_img}
              loading="eager"
            />

            <div className={css.car_info_container}>
              <div className={css.car_info}>
                <h3 className={css.car_info_name}>
                  {car.brand}{' '}
                  <span className={css.car_info_model}>{car.model}</span>,{' '}
                  {car.year}
                </h3>

                <p className={css.car_info_price}>${car.rentalPrice}</p>
              </div>

              <div className={css.car_meta}>
                <span>{car.location.city}</span>
                <span>{car.location.country}</span>
                <span>{car.rentalCompany}</span>
                <span>{car.type}</span>
                <span>{car.mileage}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/cars/${car.id}`}
            target="_blank"
            className={css.car_list_btn}
          >
            Read more
          </Link>
        </li>
      ))}
    </ul>
  );
}
