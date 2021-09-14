import React, { createContext, useEffect, useState } from "react"
import Axios from 'axios';

export const PokemonsContext = createContext();

export default function PokemonsProvider({ children }) {

    const [pokemons, setPokemons] = useState([])

    

    useEffect(() => {
       async function Pokemons1g() {
           const response = await Axios.get('https://pokeapi.co/api/v2/generation/1').then((response) => {
                var namePolekemons = []
                for (var i = 0; i < response.data.pokemon_species.length; i++) {
                    namePolekemons.push(response.data.pokemon_species[i].name)
                }
                var final = []
                for (var o = 0; o < namePolekemons.length; o++) {
                    Axios.get(`https://pokeapi.co/api/v2/pokemon/${namePolekemons[o]}`).then((response) => {
                        final.push(response.data)
    
                    })
                }
                setPokemons(final)
            })
        console.log('asd',response) }

       
        Pokemons1g()
    }, [])

    useEffect(() => {
        console.log('aqui context: ', pokemons)
    }, [setPokemons])



    return (
        <PokemonsContext.Provider value={{ pokemons, setPokemons }}>
            {children}
        </PokemonsContext.Provider>
    )
}