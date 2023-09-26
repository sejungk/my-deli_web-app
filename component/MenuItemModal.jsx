import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "../styles/MenuItemModal.module.css";
import ModalOptionGroup from "./ModalOptionGroup";
import { CartContext } from '../app/CartContext';
import ReactDOM from "react-dom";
import Image from "next/image";
import axios from "axios";

const MenuItemModal = ({itemId, id, closeModal, operationType, selectedOptions, selectedQuantity }) => {
  const [menuItemData, setMenuItemData] = useState(null);
  const [quantity, setQuantity] = useState(selectedQuantity || 1);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const { addToCart, editCartItem, calculateSelectedOptionsPrice } = useContext(CartContext);
  const [allRequiredOptionsSelected, setAllRequiredOptionsSelected] = useState(true);
  const [selectedOptionsPrice, setSelectedOptionsPrice] = useState(0);
  const [selectionCounts, setSelectionCounts] = useState(0);
  const [scrollToSection, setScrollToSection] = useState(null);
  const [addToOrderClicked, setAddToOrderClicked] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_URL}/api/menu-items/${id}`)
      .then((response) => {
        setMenuItemData(response.data);
        const initialQuantity = operationType === "edit" ? selectedQuantity : 1;
        setSelectedMenuItem({
          id: response.data.id,
          name: response.data.name,
          base_price: response.data.base_price,
          total_price: response.data.base_price,
          quantity: initialQuantity,
          selectedOptions: {},
          // description: response.data.description,
        });
      })
      .catch((error) => {
        console.error("Error fetching menu item data:", error);
      });
  }, [id]);

  useEffect(() => {
    if (operationType === "edit" && selectedOptions && menuItemData && menuItemData.option_groups) {
      setSelectedMenuItem((prevItem) => {
        const updatedSelectedOptions = {};
        // Map the keys in selectedOptions to match the option group names
        Object.keys(selectedOptions).forEach((optionGroupKey) => {
          const optionGroup = menuItemData.option_groups.find(
            (group) => group.name === optionGroupKey
          );
          if (optionGroup) {
            updatedSelectedOptions[optionGroup.name] = selectedOptions[optionGroupKey];
          }
        });

        // Calculate the selected options price based on updatedSelectedOptions
        const newSelectedOptionsPrice = calculateSelectedOptionsPrice(updatedSelectedOptions, menuItemData);

        // Update the selectedOptionsPrice state
        setSelectedOptionsPrice(newSelectedOptionsPrice);

        return {
          ...prevItem,
          selectedOptions: updatedSelectedOptions,
        };
      });
    }
    console.log(selectedOptionsPrice)
  }, [operationType, selectedOptions, menuItemData]);

  useEffect(() => {
    if (menuItemData) {
      setSelectedMenuItem((prevItem) => ({
        ...prevItem,
        quantity: quantity,
        // total_price: (parseFloat(menuItemData.base_price)),
        total_price: (parseFloat(menuItemData.base_price) + calculateSelectedOptionsPrice(prevItem.selectedOptions, menuItemData)) * quantity,
      }));
    }
  }, [quantity, menuItemData]);


  useEffect(() => {
    const allRequiredSelected = areAllRequiredOptionsSelected();
    setAllRequiredOptionsSelected(allRequiredSelected);
  }, [selectedMenuItem])

  // console selectedMenuItem
  useEffect(() => {
    if (selectedMenuItem && selectedMenuItem.selectedOptions) {
      // console.log(selectedMenuItem);
    }
  }, [selectedMenuItem]);

  const areAllRequiredOptionsSelected = () => {
    if (!menuItemData || !menuItemData.option_groups) return false;

    const requiredOptionGroups = menuItemData.option_groups.filter((optionGroup) => optionGroup.required);
    for (const optionGroup of requiredOptionGroups) {
      if (!selectedMenuItem.selectedOptions[optionGroup.name]) return false;
    }
    return true;
  };

  // auto scroll
  useEffect(() => {
    if (scrollToSection) {
      const sectionRef = scrollRef.current.querySelector(`[data-section="${scrollToSection}"]`);
      scrollTo(sectionRef);
      setScrollToSection(null);
    }
  }, [scrollToSection]);

  if (!menuItemData) return null;

  // handle when selections are changed
  const handleOptionChange = (optionGroup, option) => {
    setSelectedMenuItem((prevItem) => {
      const updatedOptions = { ...prevItem.selectedOptions };

      // Add the free_option_limit to the option
      if (!updatedOptions[optionGroup.name]) {
        updatedOptions[optionGroup.name] = {
          free_option_limit: optionGroup.free_option_limit,
        };
      }

      if (optionGroup.allow_multiple) {
        if (!updatedOptions[optionGroup.name]) updatedOptions[optionGroup.name] = {};
        if (updatedOptions[optionGroup.name][option.id]) delete updatedOptions[optionGroup.name][option.id];
        else updatedOptions[optionGroup.name][option.id] = option;
      } else {
        updatedOptions[optionGroup.name] = { [option.id]: option };
      }

      // Calculate the selected options price based on updatedOptions
      const newSelectedOptionsPrice = calculateSelectedOptionsPrice(updatedOptions, menuItemData);

      // Update the selectedOptionsPrice state
      setSelectedOptionsPrice(newSelectedOptionsPrice);

      // Calculate the total price based on the updated selected options and quantity
      const updatedTotalPrice = (parseFloat(prevItem.base_price) + newSelectedOptionsPrice) * prevItem.quantity;
      // console.log(selectedOptions, updatedOptions)
      return { ...prevItem, selectedOptions: updatedOptions, total_price: updatedTotalPrice };
    });
  };

  const handleSaveEdit = (selectedItem) => {
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
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQuantity = () => setQuantity(quantity + 1);


  // Function to scroll to a section
  const scrollTo = (sectionRef) => {
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle clicking the "Add to Cart" button
  const handleAddToCart = () => {
    setAddToOrderClicked(true);

    if (operationType === "add") {
      if (allRequiredOptionsSelected) {
        addToCart(selectedMenuItem);
        closeModal();
      } else {
        const unselectedSection = menuItemData.option_groups.find((optionGroup) => {
          return optionGroup.required && !selectedMenuItem.selectedOptions[optionGroup.name];
        });

        if (unselectedSection) {
          setScrollToSection(unselectedSection.name);
        }
      }
    } else if (operationType === "edit") {
      if (allRequiredOptionsSelected) {
        handleSaveEdit(selectedMenuItem);
        closeModal();
      } else {
        alert("Please select all required options.");
      }
    }
  }
  // console.log(menuItemData.base_price, selectedOptionsPrice, quantity)

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
        {console.log(menuItemData, menuItemData.option_groups )}
        <div className={styles.scrollableContent} ref={scrollRef}>
          <div className={styles.optionSection}>
            {/* {menuItemData.option_groups && menuItemData.option_groups[0].id !== null &&
              menuItemData.option_groups.map((optionGroup, index) => ( */}
              {menuItemData.option_groups && menuItemData.option_groups.map((optionGroup, index) => (
                <React.Fragment key={optionGroup.id}>

                  {index > 0 && <hr className={styles.sectionDivider} />}

                  <div data-section={optionGroup.name}>
                    <ModalOptionGroup
                      optionGroup={optionGroup}
                      selectedOption={
                        operationType === "edit" && selectedMenuItem.selectedOptions.hasOwnProperty(optionGroup.name)
                          ? selectedMenuItem.selectedOptions[optionGroup.name]
                          : ""
                      }
                      handleOptionChange={(optionGroup, optionName) => handleOptionChange(optionGroup, optionName)}
                      operationType={operationType}
                      selectionCounts={selectionCounts}
                      setSelectionCounts={setSelectionCounts}
                      addToOrderClicked={addToOrderClicked}
                    />
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      {console.log(selectedOptionsPrice, menuItemData)}
        <hr />
        <div className={styles.addToOrderSection}>
          <div className={styles.quantity}>
            <span className="pointer" onClick={decreaseQuantity}>-</span>
            {operationType === "edit" ? <span>{selectedMenuItem.quantity}</span> : <span>{quantity}</span>}
            <span  className="pointer" onClick={increaseQuantity}>+</span>
          </div>
          <div
            className={`bttn bttn_red bttn_small ${styles.addToOrderBttn}`}
            onClick={handleAddToCart}
            >
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
