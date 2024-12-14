'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { GET_API, IData } from '@/api/api';
import Image from 'next/image';
import Loading from './loading';
import Premium from '@/components/premium/premium';
import Menu from '@/components/menu/menu';
import Link from 'next/link';

export default function HomePage() {
  const [data, setData] = useState<IData[]>([]);
  const [final, setFinal] = useState(false);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);

  const debounce = useRef<number>(undefined);

  const handleAPI = useCallback(async (final: boolean, page: number) => {
    if (final) return;
    const response = await GET_API(page * 15, 15);
    if (response.length === 0) {
      setFinal(true);
    } else {
      setData((prev) => [...prev, ...response]);
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    handleAPI(false, 0);
  }, [handleAPI]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = event.currentTarget;

    const scrollPosition = target.scrollTop;
    const maxScrollDown = target.scrollHeight - target.clientHeight;

    if (scrollPosition === maxScrollDown) {
      clearTimeout(debounce.current);
      debounce.current = window.setTimeout(() => handleAPI(final, page), 100);
    }
  };

  return (
    <div className={styles.div} onScroll={handleScroll}>
      <Premium visible={visible} setVisible={() => setVisible(false)} />
      <Menu />
      <main className={styles.main}>
        <header>
          <div>
            <h1>Catálogo</h1>
            <hr />
          </div>
        </header>
        <section className={styles.section}>
          <h1>Resultados</h1>
          <div className={styles['div-families']}>
            {data.length === 0 ? (
              <Loading />
            ) : (
              data.map(({ id, details }) => (
                <div key={id}>
                  <Image
                    src={`https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/${id}.jpg`}
                    width={100}
                    height={100}
                    alt={details.description}
                  />
                  <Link href={`/products/${id}`} className={styles.button}>
                    <span className={styles['span-familie']}>
                      {details.name}
                    </span>
                    <span className={styles.arrow}>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1rem"
                        width="1rem"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"></path>
                      </svg>
                    </span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
        <footer className={`${styles.footer} ${visible ? styles.visible : ''}`}>
          <p>Sobre</p>
          <p>FAQ</p>
          <p>Termos de uso</p>
          <p>Politica de Privacidade</p>
        </footer>
      </main>
    </div>
  );
}
