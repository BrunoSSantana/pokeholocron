import { useEffect, useState } from 'react'
import style from '../styles/stylePage/Pokedex.module.scss'
import Axios from 'axios';
import CardPokedexComponent from '../components/CardPokedexComponent';

export default function Pokedex() {

  const [name, setName] = useState('')
  const [typePokemon, setTypePokemon] = useState('')
  const [pokeId, setPokeId] = useState('')
  const [pokemonsf, SetPokemonsf] = useState([])

  async function FilterPokedex() {
   const MyPokemons= await Axios.post('http://localhost:3003/myPokemons', {
      trainer_id: localStorage.getItem('id'),
    })

    
    SetPokemonsf(MyPokemons.data)


   console.log('MyPokemons', JSON.parse(MyPokemons.data[0].types))
    //converterToArray(MyPokemons.data[0].types)

   //JSON.parse()
  }


  useEffect(()=>{
    FilterPokedex()
  },[])



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
          <select name="type" id="type" className={style.type} onChange={(e) => { setTypePokemon(e.target.value) }}>
            <option key='fire'>fire</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="">Id: </label>
          <input type="text" id="pokeId" onChange={(e) => { setPokeId(e.target.value) }} />
        </div>
      </div>

      <button onClick={FilterPokedex}>FilterPokedex</button>


      <div className={style.card_container}>

      {pokemonsf.map((val) => {
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