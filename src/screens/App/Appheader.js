import React from 'react';
import styles from './app-header.module.css';
import Button from '../../components/Button';

const Appheader = ({ handleSearchChange, search, setShowForm }) => {
    return (
        <div className={styles.appHeader}>
            <div className={styles.searchBar}>
                <input className={styles.searchInputBar} onChange={handleSearchChange} placeholder="Search Pokemon by name or type" type="search" value={search} />
            </div>
            <div className={styles.addPokemonContainer}>
                <Button type="button" onClick={setShowForm.bind(this, true)} title="+ Add Pokemon" />
            </div>
        </div>
    )
}

export default Appheader;