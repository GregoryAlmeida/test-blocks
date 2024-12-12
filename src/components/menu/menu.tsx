import Image from "next/image";
import Link from "next/link";
import LOGO from './img/blocks-logo.png'
import styles from './menu.module.css'

export default function Menu() {
  return (
    <main className={styles.main}>
      <Link href='/'>
        <Image className={styles.img} src={LOGO} alt="Logo Blocks"/>
      </Link>
    </main>
  )
}