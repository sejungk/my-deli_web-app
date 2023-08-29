import Link from 'next/link';
import styles from "../styles/CheckoutNavbar.module.css"
import Image from "next/image";

const CheckoutNavbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className="text-decoration-none">
        <div className={styles.backBttn}>
          <Image src="/img/back-arrow.svg" layout="fill" alt="location icon" />
        </div>
        <span>Back</span>
      </Link>
    </div>
  )
}

export default CheckoutNavbar;

