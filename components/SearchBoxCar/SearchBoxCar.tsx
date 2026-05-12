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
    <>
      <form action={handleSubmit} className={css.form}>
        <div className={css.brand_container}>
          <label htmlFor={`${fieldId}-brand`} className={css.form_label}>
            Car brand
          </label>
          <select
            name="brand"
            id={`${fieldId}-brand`}
            defaultValue=""
            className={css.brand_select}
          >
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
        <div className={css.price_container}>
          <label htmlFor={`${fieldId}-price`} className={css.form_label}>
            Price/ 1 hour
          </label>
          <select
            name="price"
            defaultValue=""
            id={`${fieldId}-price`}
            className={css.price_select}
          >
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
        <div className={css.mileage_container}>
          <label htmlFor={`${fieldId}-mileage`} className={css.form_label}>
            Сar mileage / km
          </label>
          <div>
            <input
              type="text"
              name="minMileage"
              placeholder="From"
              id={`${fieldId}-mileage`}
              className={css.min_input}
            />
            <input
              type="text"
              name="maxMileage"
              placeholder="To"
              id={`${fieldId}-mileage`}
              className={css.max_input}
            />
          </div>
        </div>
        <button type="submit" className={css.form_btn}>
          Search
        </button>
      </form>
      <button type="button" className={css.clear_btn}>
        Clear filters
      </button>
    </>
  );
}
