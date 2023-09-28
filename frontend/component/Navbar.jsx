"use client"

import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { Link, animateScroll as scroll } from 'react-scroll';

const Navbar = () => {
  const currentTime = new Date();
  const isBreakfastTime = !(currentTime.getHours() >= 10 && currentTime.getHours() < 15);

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image className={styles.logo} src="./img/mydeli-logo.svg" width={100} height={100} alt="location icon" />
      </div>
      <div className={styles.linksContainer}>
        {isBreakfastTime && (
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

export default Navbar;
