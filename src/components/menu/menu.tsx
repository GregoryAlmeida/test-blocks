import Image from "next/image";
import Link from "next/link";
import LOGO from './img/blocks-logo.png'
import style from './menu.module.css'

export default function Menu() {
  return (
    <>
      <main className={style.main}>
        <Link href='/'>
          <Image className={style.img} src={LOGO} alt="Logo Blocks"/>
        </Link>
      </main>
      <hr className={style.hr} />
    </>
  )
}