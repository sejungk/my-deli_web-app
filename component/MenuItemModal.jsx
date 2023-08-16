import React from "react";
import styles from "../styles/MenuItemModal.module.css";

const MenuItemModal = ({ menuItem, closeModal }) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer}>
      <div className={styles.scrollableContent}>

        {/* name and description - start */}
        <div className={styles.itemName}>
          <h1 className={styles.title}>{eggSandwich.name}</h1>
          <p className={styles.desc}>{eggSandwich.desc}</p>
        </div>
        <hr></hr>
         {/* name and description - end */}

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
            <span>-</span>
            <span>1</span>
            <span>+</span>
          </div>
          <div className={`bttn bttn_red ${styles.addToOrderBttn}`}>
            <span>Add to Order</span>
            <span>|</span>
            <span>$3.99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;


