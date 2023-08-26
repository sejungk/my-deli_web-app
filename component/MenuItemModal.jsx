import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/MenuItemModal.module.css";
import ModalOptionGroup from "./ModalOptionGroup";
import { CartContext } from '../app/CartContext';
import axios from "axios";

const MenuItemModal = ({ menuItem, closeModal }) => {
  const [menuItemData, setMenuItemData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedMenuItem, setSelectedMenuItem] = useState({
    id: menuItem.menu_item_id,
    name: menuItem.menu_item_name,
    base_price: menuItem.menu_item_base_price,
    quantity: 1,
    selectedOptions: {}, // Start with an empty object
    description: menuItem.menu_item_description,
  });

  console.log(menuItem, menuItemData, selectedMenuItem)
  const { cartItems, addToCart, removeFromCart, checkout } = useContext(CartContext);

  useEffect(() => {
    // Fetch the data for the selected menu item
    axios
      .get(`http://localhost:5000/api/menu-items/${menuItem.id}`)
      .then((response) => {
        setMenuItemData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu item data:", error);
      });
  }, [menuItem]);

  // console.log(menuItem.menu_item_)
  const handleOptionChange = (optionGroup, option) => {
    setSelectedMenuItem((prevItem) => {
      const updatedOptions = { ...prevItem.selectedOptions, [optionGroup]: option };
      return { ...prevItem, selectedOptions: updatedOptions };
    });
  };

  // exit modal if outside is clicked
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains(styles.container)) {
      closeModal();
    }
  };

  if (!menuItemData) return null; // Return null or a loading indicator while data is being fetched

  // console.log(menuItemData)

  // increase/decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const increaseQuantity = () => setQuantity(quantity + 1);

console.log("selected ",selectedMenuItem)
  const selectedOptionsPrice = Object.values(selectedMenuItem.selectedOptions).reduce(
    (acc, option) => {
      if (option.additional_price) {
        return acc + parseFloat(option.additional_price);
      }
      return acc;
    },
    0
  );
    console.log()
  const totalPriceWithSelectedOptions = (parseFloat(selectedMenuItem.base_price) + selectedOptionsPrice) * quantity;

  return (
    <div className={styles.container} onClick={handleOutsideClick}>
      <div className={styles.modalContainer}>
        <div className={styles.headerSection}>
          {/* Close button */}
          <div className={styles.closeIcon} onClick={closeModal}>
            <span>&times;</span>
          </div>

          {/* name and description - start */}
          <div className={styles.itemName}>
            <h3 className={styles.title}>{menuItem.name}</h3>
            <p className={styles.desc}>{menuItem.description}</p>
          </div>
        </div>

      <hr></hr>

      {/* name and description - end */}
      <div className={styles.scrollableContent}>
        <div className={styles.optionSection}>
            {menuItemData.option_groups[0].option_group_id !== null &&
              menuItemData.option_groups.map((optionGroup, index) => (
              <React.Fragment key={optionGroup.option_group_id}>
                {index > 0 && <hr className={styles.sectionDivider} />}
                <ModalOptionGroup
                  optionGroup={optionGroup}
                  selectedOption={selectedMenuItem[optionGroup.option_group_display_text] || ""}
                  handleOptionChange={(optionGroup, optionName) =>
                    handleOptionChange(optionGroup, optionName)
                  }
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        <hr></hr>
        <div className={styles.addToOrderSection}>
          <div className={styles.quantity}>
            <span className="pointer" onClick={decreaseQuantity}>-</span>
            <span>{quantity}</span>
            <span  className="pointer" onClick={increaseQuantity}>+</span>
          </div>
          <div className={`bttn bttn_red ${styles.addToOrderBttn}`} onClick={() => addToCart(selectedMenuItem)}>
            <span>Add to Order</span>
            <span>|</span>
            <span>${parseFloat(totalPriceWithSelectedOptions).toFixed(2)}</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;


