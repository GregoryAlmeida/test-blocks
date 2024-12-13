import styles from './loading.module.css'

export default function Loading() {
  return (
    <main className={styles.main}>
      <span className={styles.loader} ></span>
    </main>
  )
}