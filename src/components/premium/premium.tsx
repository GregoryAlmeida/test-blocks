import styles from './premium.module.css'

export default function Premium() {
  return (
    <main className={styles.main}>
      <button className={styles.fechar} type='button'>Fechar X</button>
      <p>
        Não limite sua criatividade, junte-se a familia Blocks por apenas <strong>BRL 19,99</strong>
      </p>
      <button className={styles.button}><span>Quero ser Premium</span> <span className={styles.arrow}>➡</span></button>
    </main>
  )
}