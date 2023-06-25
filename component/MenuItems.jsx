import styles from "../styles/MenuItems.module.css";
import MenuItemCard from "./MenuItemCard";

const MenuItems = () => {
  return (
    <div className={styles.container}>
      <div className={styles.categoryText}>
        <h1 className={styles.category}>Breakfast</h1>
        <h3 className={styles.subcategory}>Breakfast Sandwiches</h3>
      </div>
        <div className={styles.wrapper}>
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
        </div>
    </div>
  )
}

export default MenuItems;
