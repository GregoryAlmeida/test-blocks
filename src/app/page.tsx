'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.css';
import { GET_API, IData } from '@/api/api';
import Image from 'next/image';
import Loading from './loading';
import Premium from '@/components/premium/premium';
import Menu from '@/components/menu/menu';

export default function HomePage() {
  const [data, setData] = useState<IData[]>([]);
  const [final, setFinal] = useState(false);
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleAPI = useCallback(async (final: boolean, page: number) => {
    if (final) return;
    const response = await GET_API(page * 36, 36);
    if (response.length === 0) {
      setFinal(true);
    } else {
      setData((prev) => [...prev, ...response]);
    }
  }, []);

  useEffect(() => {
    handleAPI(final, page);
  }, [handleAPI, page, final]);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer !== null) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPage((prev) => prev + 1);
        }
      });

      intersectionObserver.observe(footer);

      return () => intersectionObserver.disconnect();
    }
  }, []);

  return (
    <div className={styles.div}>
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
                  <button className={styles.button}>
                    <span className={styles['span-familie']}>
                      {details.name}
                    </span>
                    <span className={styles.arrow}>
                      <svg
                        stroke="black"
                        fill="black"
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
                  </button>
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
