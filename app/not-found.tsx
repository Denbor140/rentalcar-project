import Image from 'next/image';
import css from './not-found.module.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <Image
          src={'/not-found.png'}
          alt="Автомобіль біля знаку проїзду заборонено на фоні"
          width={600}
          height={600}
          className={css.not_found_img}
        />

        <div className={css.not_found_container}>
          <h1 className={css.not_found_title}>404</h1>
          <h2 className={css.not_found_subtitle}>Сторінку не знайдено</h2>
          <p className={css.not_found_description}>
            Схоже, ви звернули не туди. Але не хвилюйтеся, <br /> ми допоможемо
            вам повернутися на правильний шлях.
          </p>
          <Link href={'/'} className={css.not_found_btn}>
            На головну
          </Link>
        </div>
      </div>
    </main>
  );
}
