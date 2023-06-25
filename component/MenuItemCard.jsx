import styles from "../styles/MenuItemCard.module.css";

const MenuItemCard = () => {
  return (
    <div className={styles.container}>
      <h5 className={styles.itemName}>Breakfast Egg Sandwich</h5>
      <p className={styles.itemDesc}>Breakfast Egg Sandwich on your choice of bread</p>
      <p className={styles.itemPrice}>$2.49</p>
    </div>
  )
}

export default MenuItemCard;
