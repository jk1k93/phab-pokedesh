import React from 'react';
import styles from './item-card.module.css';
import FontAwesome from 'react-fontawesome';

const ItemCard = ({ item, setActiveId, handleFavoriteChange, handleDelete }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardIcons}>
                <FontAwesome
                    name="eye"
                    className={styles.eyeIcon}
                    onClick={setActiveId.bind(this, item.id)}
                />
                <FontAwesome
                    name="trash"
                    className={styles.trashIcon}
                    onClick={handleDelete.bind(this, item)}
                />
                <FontAwesome
                    name="star"
                    className={item.favorite ? styles.favIcon : styles.starIcon}
                    onClick={handleFavoriteChange.bind(this, item)}
                />
            </div>
            <div className={styles.itemDetail}>
                <div className="text app-primary-color link xl-line-height capitalize">
                    <button className="linkBtn" onClick={setActiveId.bind(this, item.id)}>{item.name}</button>
                </div>
                <div className="bold xl-line-height text-xs text-grey">{item.type.join(", ")}</div>
                <div className={styles.itemStats}>
                    <div className="text-xs bold">HP ({item.base.HP})</div>
                    <div className="text-xs bold">Attack ({item.base.Attack})</div>
                    <div className="text-xs bold">Defense ({item.base.Defense})</div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(ItemCard);