import React, { useContext, useEffect, useMemo, useState } from 'react'
import Axios from 'axios';
import { Link } from "react-router-dom";
import CardComponent from '../components/CardComponent';
import style from '../styles/stylePage/Home.module.scss'
import { PokemonsContext } from '../context/PokemonsContext';

export default function Home() {

  const [name, setName] = useState('')
  const [typePokemon, setTypePokemon] = useState('fire')
  const [pokeId, setPokeId] = useState('')
  const [types, setTypes] = useState([])

  const { pokemons } = useContext(PokemonsContext)

  useEffect(() => {
    async function getTypesPpokemons() {

      const pokemonTypes = []

      const { data } = await Axios.get('https://pokeapi.co/api/v2/type')
      const types = data.results
      types.forEach(type => pokemonTypes.push(type.name))
      setTypes(pokemonTypes)
    }
    getTypesPpokemons()
  }, [])

  // useEffect(() => {
  //   function filterByName() {
  //     console.log(name);
  // const newPokemons = pokemons.filter(pokemon => {
  //   return pokemon.name.startsWith(name.toLowerCase())
  // })

  //   }
  //   filterByName()

  // }, [name])
  

  let newPokemons = useMemo(() => {
    const lowerName = name.toLowerCase()

    return pokemons.filter(pokemon => {
      return pokemon.name.includes(lowerName)
    })
  }, [name, pokemons])


  // newPokemons = useMemo(() => {

  //   return pokemons.filter(pokemon => {
  //     return pokemon.id === Number(pokeId)
  //   })


  // }, [pokeId, pokemons])




  // useEffect(() => {
  //   function filterByType() {

  // const filtraPorTipo = pokemon => {
  //   // console.log(pokemon.name);
  //   return pokemon.types.forEach(slot => {
  //     console.log(slot.type.name);
  //     if (slot.type.name === typePokemon) {
  //       return true
  //     }
  //   })
    
  // }

  // let newPokemons = pokemons.filter(filtraPorTipo)

  // setPokemons(newPokemons);
// }

//   filterByType()

// }, [typePokemon])

// useEffect(() => {
//   function filterById() {
//     const newPokemons = []





//     setPokemons(newPokemons);
//   }
//   filterById()

// }, [pokeId])


return (
  <div className={style.pokedex_container}>

    <div className={style.header}>Pokemons 1º Generation</div>
    <Link to='/pokedex'>Pokedex</Link>

    <div className={style.inputs}>
      <div className="input">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
      </div>

      <div className={style.input}>
        <label htmlFor="type">Type:</label>
        <select name="type" id="type" className={style.type} value={typePokemon} onChange={(e) => { setTypePokemon(e.target.value) }}>
          {types.map(type => {
            return (<option key={type}>{type}</option>)
          })}
        </select>
      </div>

      <div className="input">
        <label htmlFor="">Id: </label>
        <input type="text" id="pokeId" value={pokeId} onChange={(e) => { setPokeId(e.target.value) }} />
      </div>
    </div>

    <div className={style.card_container}>

      {newPokemons.map((val) => {
        const types = []
        const abilities = []

        val.types.forEach(slot => {
          types.push(slot.type.name)
        })

        val.abilities.forEach(slot => {
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