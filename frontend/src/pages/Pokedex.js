import { useEffect, useState } from 'react'
import style from '../styles/stylePage/Pokedex.module.scss'
import Axios from 'axios';
import { api } from '../services/api'
import CardPokedexComponent from '../components/CardPokedexComponent';
import { Link } from 'react-router-dom';

export default function Pokedex() {

  const [name, setName] = useState('')
  const [typePokemon, setTypePokemon] = useState('')
  const [pokeId, setPokeId] = useState('')

  const [myPokemons, SetMyPokemons] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    async function FilterAllPokedex() {

      api.get('myPokemons').then(({ data }) => {
        SetMyPokemons(data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        }));
      }).catch((error) => {
        console.error(error)
      })

    }

    async function getTypesPpokemons() {

      const pokemonTypes = []

      const { data } = await Axios.get('https://pokeapi.co/api/v2/type')
      const types = data.results
      types.push('')
      types.forEach(type => pokemonTypes.push(type.name))
      setTypes(pokemonTypes)
    }

    FilterAllPokedex()
    getTypesPpokemons()
  }, [])

  useEffect(() => {

    async function FilterPokedex() {
      api.post('pokemons/filter',
        { poke_id: pokeId, type: typePokemon, name },
      ).then((MyPokemons) => {

        SetMyPokemons(MyPokemons.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        }))
      })
    }

    FilterPokedex()
  }, [name, typePokemon, pokeId])

  return (

    <div className={style.pokedex_container}>
      <div className={style.header}>Pokedex</div>

      <Link to='/'>Pokemons 1st Gen</Link>

      <div className={style.inputs}>
        <div className="input">
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
        </div>

        <div className={style.input}>
          <label htmlFor="type">Type:</label>
          <select
            name="type"
            id="type"
            className={style.type}
            onChange={(e) => { setTypePokemon(e.target.value) }}
          >
            {types.map(type => {
              return (<option key={type}>{type}</option>)
            })}
          </select>
        </div>

        <div className="input">
          <label htmlFor="">Id: </label>
          <input type="text" id="pokeId" onChange={(e) => { setPokeId(e.target.value) }} />
        </div>
      </div>

      <div className={style.card_container}>

        {myPokemons.map((val) => {

          return (
            <div key={val.name}>
              <CardPokedexComponent
                pokemon={{
                  name: val.name,
                  poke_id: val.poke_id,
                  types: val.types,
                  img: val.image,
                  abilities: val.abilities,
                  weight: val.weight,
                  attack: val.attack,
                  defense: val.defense,
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