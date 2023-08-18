import React, { useState, useEffect } from "react";
import styles from "../styles/MenuItemModal.module.css";
import ModalOptionGroup from "./ModalOptionGroup";
import { useCart } from '../app/CartContext';
import axios from "axios";

const MenuItemModal = ({ menuItem, base_price, closeModal }) => {
  const [menuItemData, setMenuItemData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart } = useCart();
  const totalPrice = base_price * quantity;

  useEffect(() => {
    console.log("Selected Options:", selectedOptions);
    // Fetch the data for the selected menu item
    axios
      .get(`http://localhost:5000/api/menu-items/${menuItem.menu_item_id}/options`)
      .then((response) => {
        setMenuItemData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu item data:", error);
      });
  }, [menuItem]);

  // Handle option selection
  const handleOptionChange = (optionGroup, optionName) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [optionGroup]: optionName,
      };

      console.log("Updated selectedOptions:", updatedOptions);

      return updatedOptions;
    });
  };

  // exit modal if outside is clicked
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains(styles.container)) {
      closeModal();
    }
  };

  if (!menuItemData) {
    return null; // Return null or a loading indicator while data is being fetched
  }
  // console.log(menuItemData)

  // increase/decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

   // Create a new cart item based on the selected options and quantity
   const cartItem = {
    name: menuItemData.name,
    quantity,
    price: totalPrice,
    selectedOptions,
  };

  const handleAddToCart = () => {
    console.log("Selected Options:", selectedOptions);

    const cartItem = {
      name: menuItemData.name,
      quantity,
      price: totalPrice,
      selectedOptions,
    };

    addToCart(cartItem);
    closeModal();
  };

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
            <h3 className={styles.title}>{menuItemData.name}</h3>
            <p className={styles.desc}>{menuItemData.description}</p>
          </div>
        </div>

      <hr></hr>

      {/* name and description - end */}
      <div className={styles.scrollableContent}>
        <div className={styles.optionSection}>
            {menuItemData.option_groups.map((optionGroup, index) => (
              <React.Fragment key={optionGroup.option_group_id}>
                {index > 0 && <hr className={styles.sectionDivider} />}
                <ModalOptionGroup
                  optionGroup={optionGroup}
                  selectedOption={selectedOptions[optionGroup.option_group_display_text] || ""}
                  handleOptionChange={(optionGroup, optionName) =>
                    handleOptionChange(optionGroup, optionName)
                  }
                />
              </React.Fragment>
            ))}
            {/* {menuItemData.option_groups[0].option_group_id !== null &&
              menuItemData.option_groups.map((optionGroup, index) => (
                <React.Fragment key={optionGroup.option_group_id}>
                  {index > 0 && <hr className={styles.sectionDivider} />}
                  <ModalOptionGroup className={styles.optionWrapper} optionGroup={optionGroup} />
                </React.Fragment>
            ))} */}
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
            <span>${parseFloat(totalPrice).toFixed(2)}</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;


