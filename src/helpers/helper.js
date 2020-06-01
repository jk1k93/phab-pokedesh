const POKEMON_DATA = "pokemon_data";
const LAST_ID = "last_id"

export const syncPokemonDataToLocalStorage = (data) => {
    localStorage.setItem(POKEMON_DATA, data);
}

export const getPokemonDataFromLocalStorage = () => {
    return localStorage.getItem(POKEMON_DATA);
}

export const setLastIdInLocalStorage = (id) => {
    localStorage.setItem(LAST_ID, id);
}

export const getLastIdFromLocalStorage = () => {
    return localStorage.getItem(LAST_ID);
}