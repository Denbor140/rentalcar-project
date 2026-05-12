import { Car } from '@/app/types/car';
import css from './CarList.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <li key={car.id} className={css.listItem}>
          <div>
            <Image src={car.img} alt={car.brand} width={244} height={268} />
            <div>
              <div>
                <p className={css.title}>
                  {car.brand} {car.model}, {car.year}
                </p>
                <p className={css.title}>{`$${car.rentalPrice}`}</p>
              </div>

              <div>
                <p className={css.title}>{car.address}</p>
                <p className={css.title}>{car.rentalCompany}</p>
                <p className={css.title}>{car.type}</p>
                <p className={css.title}>{car.mileage}</p>
              </div>
            </div>
          </div>

          <Link href={`/cars/${car.id}`}>Read more</Link>
        </li>
      ))}
    </ul>
  );
}
