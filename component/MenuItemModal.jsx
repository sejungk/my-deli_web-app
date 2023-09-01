import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/MenuItemModal.module.css";
import ModalOptionGroup from "./ModalOptionGroup";
import { CartContext } from '../app/CartContext';
import axios from "axios";

const MenuItemModal = ({ menuItem, closeModal, operationType }) => {
  const [quantity, setQuantity] = useState(1);
  const [menuItemData, setMenuItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [selectedMenuItem, setSelectedMenuItem] = useState({
    id: menuItem.id,
    name: menuItem.name,
    base_price: menuItem.base_price,
    total_price: menuItem.base_price,
    quantity: 1,
    selectedOptions: {}, // Start with an empty object
    description: menuItem.description,
  });

  // console.log("selectedMenuItem ", selectedMenuItem)
  // console.log("original: ", menuItem, "data: ",menuItemData)
  const { cartItems, addToCart, removeFromCart, checkout, editItemData } = useContext(CartContext);

  useEffect(() => {
    // Fetch the data for the selected menu item
    axios
      .get(`http://localhost:5000/api/menu-items/${menuItem.id}`)
      .then((response) => {
        setMenuItemData(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching menu item data:", error);
        setIsLoading(false); // Ensure loading is set to false on error too
      });
  }, [menuItem]);

  useEffect(() => {
    setSelectedMenuItem((prevItem) => ({
      ...prevItem,
      quantity: quantity,
      total_price: (parseFloat(menuItem.base_price) + calculateSelectedOptionsPrice(prevItem.selectedOptions)) * quantity,
    }));
  }, [quantity, menuItem]);

  const calculateSelectedOptionsPrice = (selectedOptions) => {
    return Object.values(selectedOptions).reduce((acc, option) => {
      if (option.additional_price) {
        return acc + parseFloat(option.additional_price);
      }
      return acc;
    }, 0);
  };

  if (!menuItem) return null;

  const handleOptionChange = (optionGroup, option) => {
    setSelectedMenuItem((prevItem) => {
      const updatedOptions = { ...prevItem.selectedOptions, [optionGroup]: option };

      // Calculate the selected options price based on updatedOptions
      const selectedOptionsPrice = Object.values(updatedOptions).reduce(
        (acc, option) => {
          if (option.additional_price) {
            return acc + parseFloat(option.additional_price);
          }
          return acc;
        },
        0
      );

      // Calculate the total price based on the updated selected options and quantity
      const updatedTotalPrice = (parseFloat(prevItem.base_price) + selectedOptionsPrice) * prevItem.quantity;

      return { ...prevItem, selectedOptions: updatedOptions, total_price: updatedTotalPrice };
    });
  };

  const handleSaveEdit = () => {
    if (operationType === "edit") { // Check the operation type
      // Handle the editing logic here
      // You can use the "editItemData" prop to identify the item being edited
    } else {
      // Handle the add to cart logic here
      addToCart(selectedMenuItem);
    }
    closeModal(); // Close the modal in both cases
  };

  // exit modal if outside is clicked
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains(styles.container)) {
      closeModal();
    }
  };

  // increase/decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const increaseQuantity = () => setQuantity(quantity + 1);

  // console.log("selected ",menuItem)
  const selectedOptionsPrice = Object.values(selectedMenuItem.selectedOptions).reduce(
    (acc, option) => {
      if (option.additional_price) {
        return acc + parseFloat(option.additional_price);
      }
      return acc;
    },
    0
  );
  console.log(menuItem, menuItem.option_groups);
  // console.log("selected Item for cart: ", selectedMenuItem)
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }
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

        <hr />

        {/* name and description - end */}
        <div className={styles.scrollableContent}>
          <div className={styles.optionSection}>
            {menuItemData.option_groups && menuItemData.option_groups[0].id !== null &&
              menuItemData.option_groups.map((optionGroup, index) => (
                <React.Fragment key={optionGroup.id}>
                  {index > 0 && <hr className={styles.sectionDivider} />}
                  <ModalOptionGroup
                    optionGroup={optionGroup}
                    selectedOption={selectedMenuItem.selectedOptions[optionGroup.option_group_display_text] || ""}
                    handleOptionChange={(optionGroup, optionName) =>
                      handleOptionChange(optionGroup, optionName)
                    }
                  />
                </React.Fragment>
              ))}
          </div>
        </div>

        <hr />

        <div className={styles.addToOrderSection}>
          <div className={styles.quantity}>
            <span className="pointer" onClick={decreaseQuantity}>-</span>
            <span>{quantity}</span>
            <span  className="pointer" onClick={increaseQuantity}>+</span>
          </div>
          <div
            className={`bttn bttn_red ${styles.addToOrderBttn}`}
            onClick={handleSaveEdit}>
            {operationType === "edit" ? <span>Save Edit</span> : <span>Add to Order</span>}
            <span>|</span>
            <span>${parseFloat((parseFloat(menuItem.base_price) + selectedOptionsPrice) * quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;




      // {/* name and description - end */}
      // <div className={styles.scrollableContent}>
      //     <div className={styles.optionSection}>

      //         {menuItem.option_groups && menuItem.option_groups[0] !== null &&
      //           menuItemData.option_groups.map((optionGroup, index) => (
      //           <React.Fragment key={optionGroup.id}>
      //             {index > 0 && <hr className={styles.sectionDivider} />}
      //             <ModalOptionGroup
      //               optionGroup={optionGroup}
      //               selectedOption={selectedMenuItem.selectedOptions[optionGroup.option_group_display_text] || ""}
      //               handleOptionChange={(optionGroup, optionName) =>
      //                 handleOptionChange(optionGroup, optionName)
      //               }
      //             />
      //           </React.Fragment>
      //         ))}
      //         {menuItem.option_groups && menuItem.option_groups[0] !== null &&
      //           menuItem.option_groups.map((optionGroup, index) => (
      //           <React.Fragment key={optionGroup.option_group_id}>
      //             {index > 0 && <hr className={styles.sectionDivider} />}
      //             <ModalOptionGroup
      //               optionGroup={optionGroup}
      //               selectedOption={selectedMenuItem.selectedOptions[optionGroup.option_group_display_text] || ""}
      //               handleOptionChange={(optionGroup, optionName) =>
      //                 handleOptionChange(optionGroup, optionName)
      //               }
      //             />
      //           </React.Fragment>
      //         ))}
      //     </div>
      //   </div>
