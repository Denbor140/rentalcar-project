import css from './SearchBoxCar.module.css';
import { useId, useState } from 'react';
import {
  generatePriceOptions,
  PriceRange,
} from '@/app/api/_utils/generatePriceOptions';
import CustomSelect from '../CustomSelect/CustomSelect';

interface SearchBoxCarProps {
  brands: string[];
  prices: PriceRange;
  onChange: (brand: string, price: string, min: string, max: string) => void;
}

export default function SearchBoxCar({
  brands,
  prices,
  onChange,
}: SearchBoxCarProps) {
  const fieldId = useId();
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const priceOptions = generatePriceOptions(prices);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange(brand, price, minMileage, maxMileage);
  };

  const handleClear = () => {
    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
    onChange('', '', '', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.brand_container}>
          <label htmlFor={`${fieldId}-brand`} className={css.form_label}>
            Car brand
          </label>
          <CustomSelect
            options={brands}
            value={brand}
            onChange={setBrand}
            placeholder="Choose brand"
            variant="brand"
          />
        </div>

        <div className={css.price_container}>
          <label htmlFor={`${fieldId}-price`} className={css.form_label}>
            Price/ 1 hour
          </label>
          <CustomSelect
            options={priceOptions}
            value={price}
            onChange={setPrice}
            placeholder="Choose a price"
            variant="price"
          />
        </div>

        <div className={css.mileage_container}>
          <label htmlFor={`${fieldId}-mileage`} className={css.form_label}>
            Car mileage / km
          </label>
          <div>
            <input
              type="text"
              name="minMileage"
              value={minMileage}
              placeholder="From"
              id={`${fieldId}-minMileage`}
              className={css.min_input}
              onChange={(e) => setMinMileage(e.target.value)}
            />
            <input
              type="text"
              name="maxMileage"
              value={maxMileage}
              placeholder="To"
              id={`${fieldId}-maxMileage`}
              className={css.max_input}
              onChange={(e) => setMaxMileage(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={css.form_btn}>
          Search
        </button>
      </form>
      <button type="button" className={css.clear_btn} onClick={handleClear}>
        Clear filters
      </button>
    </>
  );
}
