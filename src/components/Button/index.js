import React from 'react';
import styles from './index.module.css';

const Button = ({ onClick, title, type }) => {
    return (
        <button type={type} onClick={onClick} className={styles.btn}>{title}</button>
    )
}

export default React.memo(Button);