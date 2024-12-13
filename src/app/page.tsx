'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './page.module.css'
import { GET_API, IData } from '@/api/api';
import Image from 'next/image';
import FAMILIALOGO from '../../public/img-ilustrativa-familia.png'
import Loading from './lodaing';
import Premium from '@/components/premium/premium';
import Menu from '@/components/menu/menu';

export default function HomePage() {
  const [data, setData] = useState<IData[]>([])
  const [final, setFinal] = useState(false)
  const [page, setPage] = useState(0)
  const debounce = useRef<number>(undefined)

  const handleAPI = useCallback(async (final: boolean, page: number) => {
    if (final) return
    const response = await GET_API(page * 15, 15)
    if (response.length === 0) {
      setFinal(true)
    } else {
      setData((prev) => [...prev, ...response])
      setPage((prev) => prev + 1)
    }
  }, [])

  useEffect(() => {
    handleAPI(false, 0)
  }, [handleAPI])

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = event.currentTarget;

    const scrollPosition = target.scrollTop
    const maxScrollDown = target.scrollHeight - target.clientHeight

    if (scrollPosition === maxScrollDown) {
      clearTimeout(debounce.current)
      debounce.current = window.setTimeout( () => handleAPI(final, page) ,100) 
    }
  };

  return (
    <div className={styles.div} onScroll={handleScroll}>
      <Premium />
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
            {data.length === 0 ? <Loading /> :data.map(({id, details}) => (
              <div key={id} >
                <Image src={FAMILIALOGO} alt={details.description} />    
                <span>
                  <button className={styles['button-1']} >{details.name}</button>
                  <button className={styles['button-2']}><strong>↗</strong></button>
                </span> 
                 
              </div>
            ))}
          </div>
        </section>
        <footer className={styles.footer}>
            <p>Sobre</p>
            <p>FAQ</p>
            <p>Termos de uso</p>
            <p>Politica de Privacidade</p>
        </footer>
      </main>
    </div>
  );
}
