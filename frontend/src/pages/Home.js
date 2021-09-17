import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from "react-router-dom";
import CardComponent from '../components/CardComponent';
import style from '../styles/stylePage/Home.module.scss'
import { PokemonsContext } from '../context/PokemonsContext';
import { useHistory } from "react-router";

export default function Home() {

  const [name, setName] = useState('')
  const [typePokemon, setTypePokemon] = useState('fire')
  const [pokeId, setPokeId] = useState('')
  const [types, setTypes] = useState([])

  const history = useHistory()

  const [pokemonsFilter, setPokemonsFilter] = useState()

  const { pokemons, setPokemons } = useContext(PokemonsContext)

  
  async function getTypesPpokemons() {
    const pokemonTypes = []

    const {data} = await Axios.get('https://pokeapi.co/api/v2/type')
    const types = data.results
    types.forEach(type => pokemonTypes.push(type.name))
    setTypes(pokemonTypes)
  }

  function filterById(pokemonId) {
    const newPokemons = []

    pokemons.map(pokemon => {

        if (pokemon.id === pokemonId) {
          newPokemons.push(pokemon)
        }

    })

    setPokemons(newPokemons);
  }

  function filterByName(pokemonName) {
    let newPokemons = []

    pokemons.map((pokemon) => {

        if (pokemon.name === pokemonName.toLowerCase()) {
          newPokemons.push(pokemon)
        }

    })
    
    setPokemonsFilter(newPokemons);
  }


  useEffect(()=>{
    
  },[])

  function filterByType(filter) {

    const newPokemons = []

    pokemons.map(pokemon => {
      pokemon.types.map(slot => {
        if (slot.type.name === filter) {
          newPokemons.push(pokemon)
        }
      })
    })

    setPokemons(newPokemons);
  }

  function BuscarName(){
    filterByName(name)
  }

  function sair(){
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    history.push('/login')
  }


  return (
    <div className={style.pokedex_container}>

      <div className={style.header}>All Pokemons</div>
      <button onClick={sair}>Sair</button>
      <a href='/pokedex'><button >Pokedex</button></a>

      <div className={style.inputs}>
        <div className="input">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
          <button onClick={BuscarName}>buscar</button>
        </div>

        <div className={style.input}>
          <label htmlFor="type">Type:</label>
          <select name="type" id="type" className={style.type} onChange={(e) => { setTypePokemon(e.target.value) }}>
            {types.map(type =>{
              return(<option key={type}>{type}</option> )
            })}      
          </select>
        </div>

        <div className="input">
          <label htmlFor="">Id: </label>
          <input type="text" id="pokeId" onChange={(e) => { setPokeId(e.target.value) }} />
        </div>
      </div>


      <div className={style.card_container}>


        {pokemons.map((val) => {
          const types = []
          const abilities = []

          val.types.map(slot => {
            types.push(slot.type.name)
          })

          val.abilities.map(slot => {
            abilities.push(slot.ability.name)
          })

          return (
            <div key={val.name}>
              <CardComponent
                pokemon={{
                  name: val.name,
                  poke_id: val.id,
                  types,
                  img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${val.id}.svg`,
                  abilities,
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