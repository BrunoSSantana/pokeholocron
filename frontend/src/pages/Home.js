import React, { createContext, useContext, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'
import TitleComponent from '../components/TitleComponent'
import Axios from 'axios';
import { Link } from "react-router-dom";
import CardComponent from '../components/CardComponent';
import style from '../styles/stylePage/Home.module.scss'
import { PokemonsContext } from '../context/PokemonsContext';

export default function Home() {

    const [name, setName] = useState('')
    const [typePokemon, setTypePokemon] = useState('fire')
    const [pokeId, setPokeId] = useState('')

    const { pokemons } = useContext(PokemonsContext)
    console.log('typePokemon:',typePokemon)

    function FilterPokedex(){
      console.log('name',name)
      console.log('typePokemon:',typePokemon)
      console.log('pokeId',pokeId)
        Axios.post('http://localhost:3003/pokemons/filter', {
            type:typePokemon, 
            poke_id:pokeId, 
            name:name,
        }).then((response) => { 
          console.log(response)          
            if (!response.data) {
                //User Não encontrado
                //falta receber o tratamento
                alert('Usuário, email e/ou senha ja existem')
            }else {
                //Usuário encontrado
                alert('Foi')
                
            }
        })
    
    }






    return (
        <div className={style.pokedex_container}>

      <div className={style.header}>All Pokemons</div>
      <Link to='/pokedex'>go pokedex</Link>

      <div className={style.inputs}>
        <div className="input">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
        </div>

        <div className={style.input}>
          <label htmlFor="type">Type:</label>
          <select name="type" id="type" className={style.type} onChange={(e) => { setTypePokemon(e.target.value) }}>
            <option key='fire'>fire</option>
            <option key='bug'>bug</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="">Id: </label>
          <input type="text" id="pokeId" onChange={(e) => { setPokeId(e.target.value) }}/>
        </div>
      </div>

      <button onClick={FilterPokedex}>Search</button>


      <div className={style.card_container}>

        {pokemons.map((val) => {
          return (
            <div key={val.name}>
              <CardComponent
                pokemon={{
                  name: val.name,
                  poke_id: val.id,
                  types: val.types,
                  img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${val.id}.svg`,
                  abilities: val.abilities,
                  weight: val.weight,
                  attack: val.stats[1].base_stat,
                  defense: val.stats[2].base_stat,
                  height: val.height
                }}
              />
            </div>
          )
        })}

      </div>


    </div>
    )
}
