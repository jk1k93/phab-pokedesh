import React from 'react';
import styles from './index.module.css';

const Modal = ({ children, visible, title, onClose }) => {

    return (
        <div style={{ display: visible ? 'block' : "none" }} className={styles.modal}>

            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <span onClick={onClose} className={styles.close}>&times;</span>
                    <div className="bold text-2xl">{title}</div>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        
        </div>
    )
}

export default React.memo(Modal);