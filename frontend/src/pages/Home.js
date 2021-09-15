import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'
import TitleComponent from '../components/TitleComponent'
import Axios from 'axios';
import {
    Link,
  } from "react-router-dom";
// import styles from '../styles/stylePage/Home.module.scss'

export default function Home() {

    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [idPokemon, setIdPokemon] = useState('')
    const [pokemons, setPokemons] = useState([])
    var final = []
    var namePokemons = []
    

    


    async function getAllPokemons() {
        const { data } = await Axios.get('https://pokeapi.co/api/v2/generation/1')
        let pokes = [];

        const promisseMap = data.pokemon_species.map(async pokemon => {
            const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            pokes.push(res.data);
        });

        await Promise.all(promisseMap);

        setPokemons(pokes);
    }

    useEffect(() => {
        getAllPokemons()
    }, []);





    function teste(){
        console.log('namePokemons', namePokemons)
    }


    return (
        <div>
            <Link to='/pokedex'>go pokedex</Link>
            <button onClick={teste}>teste</button>
            <HeaderComponent />
            <MenuComponent user='douglas'/>
            <TitleComponent title='All Pokemons'/>
            <div>
                <label>Name:  </label>
                <input type="name" onChange={(e) => { setName(e.target.value) }}/>
                <label>Type:  </label>
                <select onChange={(e) => { setType(e.target.value) }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                <label>ID:  </label>
                <input type="id_pokemon" onChange={(e) => { setIdPokemon(e.target.value) }}/>
               
            </div>

            {pokemons.map((val) => {
                        return (
                            <div  key={val.name}>
                                <h3>{val.name}</h3>
                                <div>
                                    <img src={val.sprites.front_default} alt="" />
                                </div>

                            </div>
                        )
                    })}



            <h1>
                Home
            </h1>
        </div>
    )
}
