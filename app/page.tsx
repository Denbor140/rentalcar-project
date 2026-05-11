import Link from 'next/link';
import css from './page.module.css';

export default function Home() {
  return (
    <main>
      <section className={css.hero_container}>
        <div className={css.hero_content}>
          <h1 className={css.hero_title}>Find your perfect rental car</h1>

          <h2 className={css.hero_subtitle}>
            Reliable and budget-friendly rentals for any journey
          </h2>

          <Link href="/catalog" className={css.hero_btn}>
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
