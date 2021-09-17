import { useEffect, useState } from 'react'
import style from '../styles/stylePage/Pokedex.module.scss'
import Axios from 'axios';
import CardPokedexComponent from '../components/CardPokedexComponent';
import CardComponent from '../components/CardComponent';
import { useHistory } from "react-router";

export default function Pokedex() {

  const [name, setName] = useState('')
  const [typePokemon, setTypePokemon] = useState('')
  const [pokeId, setPokeId] = useState('')
  const [myPokemons, SetMyPokemons] = useState([])
  const [types, setTypes] = useState([])

  const history = useHistory()


  async function FilterPokedex() {
    const MyPokemons = await Axios.post('http://localhost:3003/myPokemons',
      {},
      {
        headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      })


    SetMyPokemons(MyPokemons.data.sort(function (a, b) {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    }))

  }

  async function getTypesPpokemons() {

    const pokemonTypes = []

    const { data } = await Axios.get('https://pokeapi.co/api/v2/type')
    const types = data.results
    console.log(types);
    types.forEach(type => pokemonTypes.push(type.name))
    setTypes(pokemonTypes)
  }

  function filterById(pokemonId) {
    const newPokemons = []

    myPokemons.map(pokemon => {

        if (pokemon.id === pokemonId) {
          newPokemons.push(pokemon)
        }

    })

    SetMyPokemons(newPokemons);
  }

  function filterByName(pokemonName) {
    const newPokemons = []

    myPokemons.map(pokemon => {

        if (pokemon.name === pokemonName.toLowerCase()) {
          newPokemons.push(pokemon)
        }

    })

    SetMyPokemons(newPokemons);
  }

  function filterByType(filter) {

    const newPokemons = []

    myPokemons.map(pokemon => {
      pokemon.types.map(slot => {
        if (slot.type.name === filter) {
          newPokemons.push(pokemon)
        }
      })
    })

    SetMyPokemons(newPokemons);
  }
  
  useEffect(() => {
    FilterPokedex()
  }, [name])

  function sair(){
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    history.push('/login')
  }


  return (

    <div className={style.pokedex_container}>
      <div className={style.header}>Pokedex</div>
      <button onClick={sair}>Sair</button>
      <a href='/'><button >All Pokemons</button></a>

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