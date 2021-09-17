import { useEffect, useState } from 'react'
import style from '../styles/stylePage/Pokedex.module.scss'
import Axios from 'axios';
import CardPokedexComponent from '../components/CardPokedexComponent';

export default function Pokedex() {

  const [name, setName] = useState('')
  const [typePokemon, setTypePokemon] = useState('')
  const [pokeId, setPokeId] = useState('')
  const [myPokemons, SetMyPokemons] = useState([])
  const [types, setTypes] = useState([])


  async function FilterPokedex() {
    const MyPokemons = await Axios.post('http://localhost:3003/myPokemons',
      {},
      {
        headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      })

    var final = []
    var pokem = []

    var arraytype = []
    SetMyPokemons(MyPokemons.data.sort(function (a, b) {
      if (Number(a.poke_id) > Number(b.poke_id)) {
        return 1
      }
      if (Number(a.poke_id) < Number(b.poke_id)) {
        return -1
      }
      return 0
    }))

    const data = MyPokemons.data

    data.map(async mypokemons => { arraytype.push(mypokemons) })

    arraytype.map(async (val) => { pokem.push(val.types) })

    // pokem.map(async pok => {

    //   console.log(pok);
    //   const converter =await JSON.parse(pok)
    //   console.log(converter);
    //   //console.log('aqui:', JSON.parse(pok))
    //   //final.push(converter)
    // })

    //pokem.push(valor)
    // await Promise.all(arraytype);
    //await pokem.push(converterType)
    //console.log('MyPokemons', MyPokemons)
    //console.log('MyPokemons', JSON.parse(MyPokemons.data[0].types))
    //converterToArray(MyPokemons.data[0].types)
    //JSON.parse()
  }

  async function getTypesPpokemons() {

    const pokemonTypes = []

    const { data } = await Axios.get('https://pokeapi.co/api/v2/type')
    const types = data.results
    types.forEach(type => pokemonTypes.push(type.name))
    setTypes(pokemonTypes)
  }


  useEffect(() => {
    FilterPokedex()
  }, [])

console.log(types);

  return (

    <div className={style.pokedex_container}>
      <div className={style.header}>Pokedex</div>

      <div className={style.inputs}>
        <div className="input">
          <label htmlFor="name">Name:</label>
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