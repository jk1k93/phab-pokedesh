import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Modal from '../../components/Modal';
import styles from './add-pokemon.module.css'
import Button from '../../components/Button';

const AddPokemon = ({ visible, onClose, typesList, lastId, createPokemon }) => {

    const [name, setName] = useState('');
    const [types, setTypes] = useState([]);
    const [attrs, setAttrs] = useState({
        HP: 0,
        Attack: 0,
        Defense: 0,
        SpAttack: 0,
        SpDefense: 0,
        Speed: 0
    });

    const [errors, setErrors] = useState({
        name: false,
        types: false
    })

    const attrList = ["HP", "Attack", "Defense", "SpAttack", "SpDefense", "Speed"];

    const handleSubmit = (e) => {
        e.preventDefault();
        let error_name = false, error_type = false;
        if (!name.trim().length) {
            error_name = true;
        }
        if (!types.length) {
            error_type = true;
        }
        setErrors({ name: error_name, types: error_type });
        if (error_name || error_type) {
            return false;
        }
        createPokemon({
            id: lastId,
            name,
            type: types.map(type => type.name),
            base: attrs,
            favorite: false,
            deleted: false
        })
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        setErrors(currErrors => {
            return { ...currErrors, name: false }
        })
    }

    const onTypeChange = (selectedList) => {
        setTypes(selectedList)
        setErrors(currErrors => {
            return { ...currErrors, types: false }
        })
    }

    const handleAttrChange = (value, item) => {
        setAttrs(currAttr => {
            return {
                ...currAttr, [item]: !isNaN(parseInt(value)) ? parseInt(value) : 0
            }
        })
    }

    return (
        <Modal title="Add Pokemon" visible={visible} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <input
                        onChange={handleNameChange}
                        value={name}
                        className={styles.inputBox}
                        type="text"
                        placeholder="Enter Pokemon Name"
                    />
                    {errors.name ? <div className="error">Invalid Name</div> : false}
                </div>

                <div className={styles.inputContainer}>
                    <Multiselect
                        options={typesList}
                        onSelect={onTypeChange}
                        onRemove={onTypeChange}
                        displayValue="name"
                        placeholder="Select Types"
                    />
                    {errors.types ? <div className="error">Please select atleast one type</div> : false}
                </div>

                <div className={`mb-2 ${styles.inputContainer}`}>
                    Attributes
                </div>
                
                <div className={`text ${styles.inputContainer}`}>
                    {attrList.map(item => {
                        return (
                            <div className={`flex items-center mb-2`} key={item}>
                                <div className={styles.attrObj}>{item}</div>
                                <div>
                                    <input className={styles.attrInputBox} onChange={(e) => handleAttrChange(e.target.value, item)} value={attrs[item]} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.inputContainer}>
                    <Button type="submit" title="Submit" />
                </div>
            </form>
        </Modal>
    )
}

export default AddPokemon;