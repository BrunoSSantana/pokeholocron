import React, { createContext, useEffect, useState } from "react"
import Axios from 'axios';

export const PokemonsContext = createContext();

export default function PokemonsProvider({ children }) {

    const [pokemons, setPokemons] = useState([])

    async function getAllPokemons() {
        const { data } = await Axios.get('https://pokeapi.co/api/v2/generation/1')
        let pokes = [];


        const promisseMap = data.pokemon_species.map(async pokemon => {
            const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            pokes.push(res.data);
        });

        await Promise.all(promisseMap);

        setPokemons(pokes.sort(function (a,b) {
            if (a.id > b.id) {
              return 1
            }
            if (a.id < b.id) {
              return -1
            }
            return 0
          }));
    }

    useEffect(() => {
        getAllPokemons()
    }, []);

    return (
        <PokemonsContext.Provider value={{ pokemons, setPokemons }}>
            {children}
        </PokemonsContext.Provider>
    )
}