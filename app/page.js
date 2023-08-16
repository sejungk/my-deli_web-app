"use client"

import styles from "../styles/Home.module.css"
import MenuItems from '../component/MenuItems'
import Cart from '../component/Cart'

export default function Home() {
  return (
   <div className={styles.container}>
       <MenuItems/>
       <Cart />
   </div>
  )
}


