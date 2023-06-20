import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>Breakfast</div>
      <div className={styles.item}>Subs</div>
      <div className={styles.item}>Wraps</div>
      <div className={styles.item}>Sandwich</div>
      <div className={styles.item}>Burgers</div>
      <div className={styles.item}>Rice Bowls</div>
    </div>
  )
}

export default Navbar;
