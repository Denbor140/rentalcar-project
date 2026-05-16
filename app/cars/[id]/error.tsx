'use client';

import Image from 'next/image';
import css from './error.module.css';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  const router = useRouter();
  return (
    <main className={css.main}>
      <div className={css.container}>
        <Image
          src={'/error.png'}
          alt=""
          width={672}
          height={378}
          className={css.error_img}
        />

        <div className={css.error_container}>
          <h2 className={css.error_title}>Щось пішло не так</h2>
          <p className={css.error_subtitle}>
            Виникла неочікувана помилка. Ми вже працюємо над її виправленням.
          </p>
          <div className={css.error_btn_container}>
            <button onClick={reset} className={css.error_btn_reset}>
              Спробувати ще раз
            </button>
            <button
              onClick={() => router.replace('/catalog')}
              className={css.error_btn_back}
            >
              Повернутися до каталогу
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
