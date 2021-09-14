import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'
import TitleComponent from '../components/TitleComponent'
// import styles from '../styles/stylePage/Home.module.scss'

export default function Home() {

    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [idPokemon, setIdPokemon] = useState('')


    return (
        <div>
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


            <h1>
                Home
            </h1>
        </div>
    )
}
