import css from './SearchBoxCar.module.css';
import { useId } from 'react';

interface SearchBoxCarProps {
  brands: string[];
  prices: string[];
  onChange: (brand: string, price: string, min: string, max: string) => void;
}

export default function SearchBoxCar({
  brands,
  prices,
  onChange,
}: SearchBoxCarProps) {
  const fieldId = useId();

  const handleSubmit = (formData: FormData) => {
    const brand = formData.get('brand') as string;
    const price = formData.get('price') as string;
    const minMileage = formData.get('minMileage') as string;
    const maxMileage = formData.get('maxMileage') as string;

    onChange(brand, price, minMileage, maxMileage);
  };

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor={`${fieldId}-brand`}>Car brand</label>
        <select name="brand" id={`${fieldId}-brand`} defaultValue="">
          <option value="" hidden>
            Choose brand
          </option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${fieldId}-price`}>Price/ 1 hour</label>
        <select name="price" defaultValue="" id={`${fieldId}-price`}>
          <option value="" disabled hidden>
            Choose a price
          </option>

          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${fieldId}-mileage`}>Сar mileage / km</label>
        <div>
          <input
            type="text"
            name="minMileage"
            placeholder="From"
            id={`${fieldId}-mileage`}
          />
          <input
            type="text"
            name="maxMileage"
            placeholder="To"
            id={`${fieldId}-mileage`}
          />
        </div>
      </div>

      <button type="submit">Search</button>
    </form>
  );
}
