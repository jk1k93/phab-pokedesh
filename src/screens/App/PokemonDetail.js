import React from 'react';
import Modal from '../../components/Modal';

const PokemonDetail = ({ activeId, onClose, data }) => {

    const pokemon = data.find(elem => elem.id === activeId)

    if (!pokemon) return null;

    const attrList = ["HP", "Attack", "Defense", "SpAttack", "SpDefense", "Speed"];

    return (
        <Modal title="Pokemon Details" visible={activeId} onClose={onClose}>
            <div className="bold text-2xl capitalize mb-2">{pokemon.name}</div>
            <div className="bold text-grey mb-2">{pokemon.type.join(", ")}</div>
            <hr />
            <div className={`mb-2`}>
                Attributes
            </div>
            {attrList.map(elem => {
                return (
                    <div key={elem} className="flex mb-2">
                        <div className="bold w-30">{elem}</div>
                        <div>{pokemon.base[elem]}</div>
                    </div>
                )
            })}
        </Modal>
    )
}

export default PokemonDetail;