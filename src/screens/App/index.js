import React, { useState, useCallback, useEffect } from 'react';
import { data } from '../../dummy-data/poke';
import styles from './app.module.css';
import ItemCard from './ItemCard';
import Appheader from './Appheader';
import AddPokemon from './AddPokemon';
import PokemonDetail from './PokemonDetail';
import { getPokemonDataFromLocalStorage, syncPokemonDataToLocalStorage, getLastIdFromLocalStorage, setLastIdInLocalStorage } from '../../helpers/helper';

const App = () => {

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [typesList, setTypesList] = useState([]);



  const inititalizeData = useCallback(async () => {
    const localData = getPokemonDataFromLocalStorage();
    if (localData) {
      setPokemonData(JSON.parse(localData))
    } else {
      syncPokemonDataToLocalStorage(JSON.stringify(data));
      setPokemonData(data);
    }

    const localLastId = getLastIdFromLocalStorage();
    if (localLastId) {
      setLastId(parseInt(localLastId));
    } else {
      setLastId(201);
    }


    const typesSet = new Set();
    data.forEach(elem => {
      elem.type.forEach(item => typesSet.add(item))
    });
    let list = Array.from(typesSet);
    list = list.map((name, id) => {
      return { id, name }
    })
    setTypesList(list);

  }, []);



  useEffect(() => {
    inititalizeData();
  }, [inititalizeData]);



  const createPokemon = (pokemon) => {
    console.log(pokemon)
    setPokemonData(currData => {
      const updatedPokemonData = [pokemon, ...currData];
      syncPokemonDataToLocalStorage(JSON.stringify(updatedPokemonData))
      return updatedPokemonData
    });
    setLastId(currLastId => {
      setLastIdInLocalStorage(currLastId + 1);
      return currLastId + 1;
    })
    setShowForm(false);
  }



  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);



  const handleFavoriteChange = useCallback((pokemon) => {
    setPokemonData(currData => {
      const pokIndex = currData.findIndex(elem => elem.id === pokemon.id);
      const updatedPokemonData = [...currData.slice(0, pokIndex), { ...pokemon, favorite: !pokemon.favorite }, ...currData.slice(pokIndex + 1)];
      syncPokemonDataToLocalStorage(JSON.stringify(updatedPokemonData))
      return updatedPokemonData
    });
  }, [])



  const handleDelete = useCallback((pokemon) => {
    setPokemonData(currData => {
      const pokIndex = currData.findIndex(elem => elem.id === pokemon.id);
      const updatedPokemonData = [...currData.slice(0, pokIndex), ...currData.slice(pokIndex + 1)];
      syncPokemonDataToLocalStorage(JSON.stringify(updatedPokemonData))
      return updatedPokemonData
    });
  }, [])



  const onClose = () => {
    setShowForm(false);
    setActiveId(null);
  }



  const filteredData = pokemonData.filter(d => {
    const name = d.name.toLowerCase();
    const searchText = search.toLowerCase();
    const types = d.type;
    return name.includes(searchText) || types.filter(type => type.toLowerCase().includes(searchText)).length > 0;
  });



  return (
    <div className={styles.screen}>
      <Appheader
        setShowForm={setShowForm}
        handleSearchChange={handleSearchChange}
        search={search}
      />

      {!filteredData.length ? (
        <div className={styles.noDataTextContainer}>
          No Data Found!
        </div>
      ) : null}

      <div className={styles.itemsList}>
        {
          filteredData.map(item => {
            return (
              <div key={item.id} className={styles.itemCard}>
                <ItemCard
                  handleDelete={handleDelete}
                  handleFavoriteChange={handleFavoriteChange}
                  setActiveId={setActiveId} item={item}
                />
              </div>
            )
          })
        }
      </div>
      <PokemonDetail
        onClose={onClose}
        data={pokemonData}
        activeId={activeId}
      />
      <AddPokemon
        typesList={typesList}
        onClose={onClose}
        visible={showForm}
        lastId={lastId}
        createPokemon={createPokemon}
      />
    </div>
  );
}

export default App;
