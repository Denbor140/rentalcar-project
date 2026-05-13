'use client';

import { useState } from 'react';
import css from './CustomSelect.module.css';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant: 'brand' | 'price';
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  variant,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${css.select_container} ${
        variant === 'brand' ? css.select_brand : css.select_price
      }`}
    >
      <div
        className={css.select_value}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value || placeholder}
        <svg
          width={16}
          height={16}
          className={`${css.select_icon} ${open ? css.icon_open : ''}`}
        >
          <use
            href={
              open
                ? '/sprite.svg#icon-chevron-up'
                : '/sprite.svg#icon-chevron-down'
            }
          ></use>
        </svg>
      </div>

      <div
        className={`${css.dropdown_container} ${open ? css.dropdown_container_open : ''} ${
          variant === 'brand' ? css.dropdown_brand : css.dropdown_price
        }`}
      >
        <ul className={`${css.dropdown_list} `}>
          {options.map((opt) => (
            <li
              key={opt}
              className={`${css.select_option} ${value === opt ? css.select_option_active : ''}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
