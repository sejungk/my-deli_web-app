import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/MenuItemModal.module.css";
import ModalOptionGroup from "./ModalOptionGroup";
import { CartContext } from '../app/CartContext';
import ReactDOM from "react-dom";
import Image from "next/image";
import axios from "axios";

const MenuItemModal = ({itemId, id, closeModal, operationType, selectedOptions }) => {
  const [menuItemData, setMenuItemData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const { addToCart, setEditItem, editCartItem } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/menu-items/${id}`)
      .then((response) => {
        setMenuItemData(response.data);
        setIsLoading(false);
        setSelectedMenuItem({
          id: response.data.id,
          name: response.data.name,
          base_price: response.data.base_price,
          total_price: response.data.base_price,
          quantity: 1,
          selectedOptions: {},
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.error("Error fetching menu item data:", error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (operationType === "edit" && selectedOptions && menuItemData && menuItemData.option_groups) {
      setSelectedMenuItem((prevItem) => {
        const updatedSelectedOptions = {};

        // Map the keys in selectedOptions to match the option group names
        Object.keys(selectedOptions).forEach((optionGroupKey) => {
          // Find the option group by its key
          const optionGroup = menuItemData.option_groups.find(
            (group) => group.name === optionGroupKey
          );
          if (optionGroup) {
            updatedSelectedOptions[optionGroup.name] = selectedOptions[optionGroupKey];
          }
        });
        return {
          ...prevItem,
          selectedOptions: updatedSelectedOptions,
        };
      });
    }
  }, [operationType, selectedOptions, menuItemData]);

  useEffect(() => {
    if (menuItemData) {
      setSelectedMenuItem((prevItem) => ({
        ...prevItem,
        quantity: quantity,
        total_price: (parseFloat(menuItemData.base_price) + calculateSelectedOptionsPrice(prevItem.selectedOptions)) * quantity,
      }));
    }
  }, [quantity, menuItemData]);

  const calculateSelectedOptionsPrice = (selectedOptions) => {
    return Object.values(selectedOptions).reduce((acc, option) => {
      if (option.additional_price) {
        return acc + parseFloat(option.additional_price);
      }
      return acc;
    }, 0);
  };

  if (!menuItemData) return null;

  const handleOptionChange = (optionGroup, option) => {
    setSelectedMenuItem((prevItem) => {
      const updatedOptions = { ...prevItem.selectedOptions, [optionGroup.name]: option };
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

  // const handleSaveEdit = () => {
  //   console.log(selectedMenuItem)
  //   setEditItem({ ...selectedMenuItem });
  //   console.log(setEditItem)
  //   closeModal(); // Close the modal in both cases
  // };
  const handleSaveEdit = (selectedItem) => {
    console.log(itemId)
    // editCartItem({ ...selectedMenuItem });
    editCartItem(selectedItem, itemId);
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

  // console.log(selectedMenuItem, selectedOptions)
  if (isLoading) return <div>Loading...</div>;
  // console.log(operationType, selectedMenuItem.selectedOptions)
  return ReactDOM.createPortal(
    <div className={styles.container} onClick={handleOutsideClick}>
      <div className={styles.modalContainer}>
        <div className={styles.headerSection}>
          {/* Close button */}
          <div className={styles.closeIcon} onClick={closeModal}>
            <Image className={styles.icon} src="/img/x-icon.svg" layout="fill" alt="location icon" />
          </div>

          {/* name and description - start */}
          <div className={styles.itemName}>
            <h3 className={styles.title}>{menuItemData.name}</h3>
            <p className={styles.desc}>{menuItemData.description}</p>
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
                  {/* {console.log(selectedMenuItem.selectedOptions[optionGroup.name])} */}
                  <ModalOptionGroup
                    optionGroup={optionGroup}
                    selectedOption={
                      operationType === "edit" && selectedMenuItem.selectedOptions.hasOwnProperty(optionGroup.name)
                        ? selectedMenuItem.selectedOptions[optionGroup.name]
                        : ""
                    }
                    handleOptionChange={(optionGroup, optionName) => handleOptionChange(optionGroup, optionName)}
                    operationType={operationType}
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
            onClick={() => {
              if (operationType === "add") addToCart(selectedMenuItem);
              else if (operationType === "edit") handleSaveEdit(selectedMenuItem);
              // addToCart(selectedMenuItem);
              closeModal()
            }}>
            {operationType === "edit" ? <span>Save Edit</span> : <span>Add to Order</span>}
            <span>|</span>
            <span>${parseFloat((parseFloat(menuItemData.base_price) + selectedOptionsPrice) * quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MenuItemModal;


