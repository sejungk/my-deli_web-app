"use client"

import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { Link, animateScroll as scroll } from 'react-scroll';

const Navbar = () => {
  const time1030 = new Date(0, 0, 0, 10, 30, 0, 0);
  const isBefore1030 = new Date() < time1030;

  return (
    <div>
      <div className={styles.logoWrapper}>
        <Image className={styles.logo} src="/img/mydeli-logo.svg" layout="fill" alt="location icon" />
      </div>
      <div className={styles.linksContainer}>
        {isBefore1030 && (
        <Link className={styles.link} to="breakfast" smooth={true} duration={500}>
          <div className={styles.item}>Breakfast</div>
        </Link>
        )}
        <Link className={styles.link} to="subs" smooth={true} duration={500}>
          <div className={styles.item}>Subs</div>
        </Link>
        <Link className={styles.link} to="salad-wraps" smooth={true} duration={500}>
          <div className={styles.item}>Salad &amp; Wraps</div>
        </Link>
        <Link className={styles.link} to="sandwiches" smooth={true} duration={500}>
          <div className={styles.item}>Sandwiches</div>
        </Link>
        <Link className={styles.link} to="burgers" smooth={true} duration={500}>
          <div className={styles.item}>Burgers</div>
        </Link>
        <Link className={styles.link} to="rice-bowls-stir-fry" smooth={true} duration={500}>
          <div className={styles.item}>Rice Bowls &amp; Stir Fry</div>
        </Link>
        <Link className={styles.link} to="sides" smooth={true} duration={500}>
          <div className={styles.item}>Sides</div>
        </Link>
      </div>
      <hr className={styles.underline}></hr>
    </div>
  );
}

//   return (
//     <div>
//       <div className={styles.logoWrapper}>
//         <Image className={styles.logo} src="/img/mydeli-logo.svg" layout="fill" alt="location icon" />
//       </div>
//       <div className={styles.linksContainer}>
//         {isBefore1030 && <div className={styles.item}>Breakfast</div>}
//         <div className={styles.item}>Subs</div>
//         <div className={styles.item}>Wraps</div>
//         <div className={styles.item}>Sandwich</div>
//         <div className={styles.item}>Burgers</div>
//         <div className={styles.item}>Rice Bowls</div>
//       </div>
//       <hr className={styles.underline}></hr>
//     </div>
//   )
// }

export default Navbar;
