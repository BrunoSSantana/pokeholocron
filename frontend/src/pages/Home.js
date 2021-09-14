import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'
import TitleComponent from '../components/TitleComponent'
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
// import styles from '../styles/stylePage/Home.module.scss'

export default function Home() {

    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [idPokemon, setIdPokemon] = useState('')
    const [pokemons, setPokemons] = useState([])
    var final = []
    function Pokemons1g() {
        Axios.get('https://pokeapi.co/api/v2/generation/1').then((response) => {
            console.log('ima: ', response.data.pokemon_species[0].name)
            var namePolekemons = []
            for(var i= 0; i < response.data.pokemon_species.length; i++){
                namePolekemons.push(response.data.pokemon_species[i].name)
            }            
            for(var o= 0; o < namePolekemons.length; o++){
                Axios.get(`https://pokeapi.co/api/v2/pokemon/${namePolekemons[o]}`).then((response) => {
                    final.push(response.data)
                })               
            }            
        })
        setPokemons(final)
    }

    


    useEffect(async()=>{
       await Pokemons1g()
    },[])


    return (
        <div>
            <Link to='/pokedex'>go pokedex</Link>
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
