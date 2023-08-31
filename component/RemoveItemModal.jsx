// import styles from "../styles/RemoveItemModal.module.css";
// import React from "react";

// const RemoveItemModal = ({ itemName, onCancel, onConfirm }) => {
//   return (
//     <div className={styles.container}>
//     <div className={styles.modal}>
//       <p>Delete {itemName} from your order?</p>
//       <button onClick={onCancel} className={styles.closeButton}>
//         Cancel
//       </button>
//       <button onClick={onConfirm}>Remove</button>
//     </div>
//   </div>
//   );
// };

// export default RemoveItemModal;

import ReactDOM from 'react-dom';
import styles from "../styles/RemoveItemModal.module.css";

const RemoveItemModalPortal = ({ itemName, onCancel, onConfirm, isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Delete {itemName} from your order?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Remove</button>
      </div>
    </div>,
    document.body // Attach the modal to the root of the HTML document
  );
};

export default RemoveItemModalPortal;
