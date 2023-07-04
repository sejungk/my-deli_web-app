import styles from "../styles/Cart.module.css";
import Image from "next/image";

const Cart = ( ) => {
  return (
    <div className={styles.container}>
        <div className={styles.pickupDetailSection}>
          <h5>Pickup Order Summary</h5>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <Image src="/img/location-icon.svg" layout="fill" alt="location icon"/>
            </div>
            <p>521 Broadway St, Quantico</p>
          </div>
          <div className="bttn bttn_outline bttn_center">
              <span>Mon, Jun 12 8:45 am</span>
          </div>
        </div>

        <hr></hr>

        <div className={styles.addedItemSection}>
          {/* item #1 - start */}
          <div className={styles.singleItemContainer}>
            <div className={styles.singleItemHeader}>
              <span className={styles.itemQuantity}>1</span>
              <span className={styles.itemName}>Egg and Cheese Sandwich</span>
              <span className={styles.itemPrice}>$2.99</span>
            </div>
            <ol className={styles.addOnsList}>
              <li><p>Wheat bread</p></li>
              <li><p>American Cheese</p></li>
              <li><p>Provolone Cheese</p></li>
            </ol>
            <div className={styles.editRemoveOptions}>
              <a href="url">Edit</a>
              <a href="url">Remove</a>
            </div>
          </div>
          {/* item #1 - end */}

          <hr></hr>

          {/* item #2 - start */}
          <div className={styles.singleItemContainer}>
            <div className={styles.singleItemHeader}>
              <span className={styles.itemQuantity}>1</span>
              <span className={styles.itemName}>Egg and Cheese Sandwich</span>
              <span className={styles.itemPrice}>$2.99</span>
            </div>
            <ol className={styles.addOnsList}>
              <li><p>Wheat bread</p></li>
              <li><p>American Cheese</p></li>
              <li><p>Provolone Cheese</p></li>
            </ol>
            <div className={styles.editRemoveOptions}>
              <a href="url">Edit</a>
              <a href="url">Remove</a>
            </div>
          </div>
          {/* item #2 - end */}

          <hr></hr>

          {/* item #3 - start */}
          <div className={styles.singleItemContainer}>
            <div className={styles.singleItemHeader}>
              <span className={styles.itemQuantity}>1</span>
              <span className={styles.itemName}>Egg and Cheese Sandwich</span>
              <span className={styles.itemPrice}>$2.99</span>
            </div>
            <ol className={styles.addOnsList}>
              <li><p>Wheat bread</p></li>
              <li><p>American Cheese</p></li>
              <li><p>Provolone Cheese</p></li>
            </ol>
            <div className={styles.editRemoveOptions}>
              <a href="url">Edit</a>
              <a href="url">Remove</a>
            </div>
          </div>
          {/* item #3 - end */}
        </div>

        <hr></hr>

        <div className={styles.subtotalSection}>
          <div className={styles.subtotalInfo}>
            <h5>Subtotal</h5>
            <h5>$2.99</h5>
          </div>
          <div className="bttn bttn_red bttn_center">
              <span>Checkout</span>
          </div>
        </div>
    </div>
  )
}

export default Cart;
