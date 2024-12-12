'use client'
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import { GET_API, IData } from '@/api/api';
import Image from 'next/image';
import FAMILIALOGO from '../../public/img-ilustrativa-familia.png'

export default function HomePage() {
  const [data, setData] = useState<IData[]>([])

  const handleAPI = async () => {
    const response = await GET_API(0, 15)
    setData(response)
  }

  useEffect(() => {
    handleAPI()
  }, [])

  return (
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
          {data.map(({id, details}) => (
            <div key={id} >
              <Image src={FAMILIALOGO} alt={details.description} />     
              <button>{details.name} | ↗</button>
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
  );
}
