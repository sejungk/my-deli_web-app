import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  const time1030 = new Date(0, 0, 0, 10, 30, 0, 0);
  const isBefore1030 = new Date() < time1030;

  return (
    <div>
      <div className={styles.logo}>My Deli</div>
      <div className={styles.container}>
        {isBefore1030 && <div className={styles.item}>Breakfast</div>}
        <div className={styles.item}>Subs</div>
        <div className={styles.item}>Wraps</div>
        <div className={styles.item}>Sandwich</div>
        <div className={styles.item}>Burgers</div>
        <div className={styles.item}>Rice Bowls</div>
      </div>
      <hr className={styles.underline}></hr>
    </div>
  )
}

export default Navbar;
