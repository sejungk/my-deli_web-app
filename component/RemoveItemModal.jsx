import ReactDOM from 'react-dom';
import styles from "../styles/RemoveItemModal.module.css";

const RemoveItemModalPortal = ({ itemName, onCancel, onConfirm, isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.closeIcon} onClick={onCancel}>
            <span>&times;</span>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.textWrapper}>
              <h5>Remove Item</h5>
              <p>Delete {itemName} from your order?</p>
            </div>
            <div className={styles.buttonWrapper}>
              <button className="bttn bttn_red bttn_center" onClick={onConfirm}>
                <span>Remove</span>
              </button>
              <button className="bttn bttn_outline bttn_center" onClick={onCancel}>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RemoveItemModalPortal;
