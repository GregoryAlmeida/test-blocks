import styles from './page.module.css'

export default function HomePage() {
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
      </section>
    </main>
  );
}
