import React, { useState, useEffect } from "react";
import styles from "../styles/MenuItemModal.module.css";
import axios from "axios";

const MenuItemModal = ({ menuItem, closeModal }) => {
  const [menuItemData, setMenuItemData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch the data for the selected menu item
    axios
      .get(`http://localhost:5000/api/menu-items/${menuItem.menu_item_id}`)
      .then((response) => {
        setMenuItemData(response.data[0]); // Assuming the response is an array with one menu item
      })
      .catch((error) => {
        console.error("Error fetching menu item data:", error);
      });
  }, [menuItem]);

  if (!menuItemData) {
    return null; // Return null or a loading indicator while data is being fetched
  }

  // manually added example data
  const eggSandwich = {
      id: 10,
      name: "Country Burrito Burrito",
      desc: "2 eggs, sausage, home fries, and american cheese wrapped in a large flour tortilla.",
      base_price: 5.49,
      category_id: 4,
      exclusions: "Home Fries, Cheese",
      options : [{
        option_name: "homefries_toast",
        option_display_text: "Add Home Fries and Toast",
        option_allow_multiple: true,
        option_required: false,
        free_option_limit: null,
        options: {
          options_name: "Add a Side of Home Fries",
          options_additional_price: 3.99
        }
      }]
  };

  // increase/decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const totalPrice = eggSandwich.base_price * quantity;
  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
        <div className={styles.headerSection}>
          {/* Close button */}
          <div className={styles.closeIcon} onClick={closeModal}>
            <span>&times;</span>
          </div>

          {/* name and description - start */}
          <div className={styles.itemName}>
            <h3 className={styles.title}>{menuItemData.menu_item_name}</h3>
            <p className={styles.desc}>{menuItemData.menu_item_description}</p>
          </div>
        </div>

      <hr></hr>

      {/* name and description - end */}
      <div className={styles.scrollableContent}>
        <div className={styles.optionSection}>

          <div className={styles.optionWrapper}>
            <div className={styles.optionDesc}>
              <h5>Choose your bread</h5>
              <div className={styles.requiredOptionalLabel}>REQUIRED</div>
            </div>

            <div className={styles.optionChoices}>
              <div className={styles.listOption}>
                <label>
                  <input className={styles.option} type="radio" value="White" name="bread" /> White
                </label>
                <div>---</div>
              </div>

              <div className={styles.listOption}>
                <label>
                  <input className={styles.option} type="radio" value="White" name="bread" /> Wheat
                </label>
                <div>---</div>
              </div>

              <div className={styles.listOption}>
                <label>
                  <input className={styles.option} type="radio" value="White" name="bread" /> Rye
                </label>
                <div>---</div>
              </div>

              <div className={styles.listOption}>
                <label>
                  <input className={styles.option} type="radio" value="White" name="bread" /> Sourdough
                </label>
                <div>---</div>
              </div>

            </div>
          </div>

          <hr className={styles.sectionDivider}></hr>

          <div className={styles.optionWrapper}>
            <div className={styles.optionDesc}>
              <h5>Add Cheese</h5>
              <div className={styles.requiredOptionalLabel}>OPTIONAL</div>
            </div>

            <div className={styles.optionChoices}>

              <div className={styles.listOption}>
                <label>
                  <input type="radio" value="american" name="cheese" /> American Cheese
                </label>
                <div>---</div>
              </div>

              <div className={styles.listOption}>
                <label>
                  <input type="radio" value="swiss" name="cheese" /> Swiss
                </label>
                <div>---</div>
              </div>

            </div>
          </div>

          <hr className={styles.sectionDivider}></hr>

          <div className={styles.optionWrapper}>
            <div className={styles.optionDesc}>
              <h5>Add meat</h5>
              <div className={styles.requiredOptionalLabel}>OPTIONAL</div>
            </div>

            <div className={styles.optionChoices}>

              <div className={styles.listOption}>
                <label>
                  <input type="radio" value="turkey" name="meat" /> Turkey
                </label>
                <div>---</div>
              </div>

              <div className={styles.listOption}>
                <label>
                  <input type="radio" value="ham" name="meat" /> Ham
                </label>
                <div>---</div>
              </div>

              <div className={styles.listOption}>
                <label>
                  <input type="radio" value="bacon" name="meat" /> Bacon
                </label>
                <div>---</div>
              </div>

              <div className={styles.listOption}>
                <label>
                  <input type="radio" value="sausage" name="meat" /> Sausage
                </label>
                <div>---</div>
              </div>

            </div>
          </div>

          </div>
        </div>

        <hr></hr>
        <div className={styles.addToOrderSection}>
          <div className={styles.quantity}>
            <span className="pointer" onClick={decreaseQuantity}>-</span>
            <span>{quantity}</span>
            <span  className="pointer" onClick={increaseQuantity}>+</span>
          </div>
          <div className={`bttn bttn_red ${styles.addToOrderBttn}`}>
            <span>Add to Order</span>
            <span>|</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;


