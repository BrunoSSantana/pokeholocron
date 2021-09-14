import { useEffect, useState, useContext } from 'react'
import CardComponent from '../components/CardComponent'
import style from '../styles/stylePage/Pokedex.module.scss'
import Axios from 'axios';
import { PokemonsContext } from '../context/PokemonsContext';

export default function Pokedex() {





  const [name, setName] = useState('')

  const {pokemons, setPokemons} = useContext(PokemonsContext)

  useEffect(() => {
    console.log('aqui pokedex: ', pokemons)
}, [setPokemons])


  function teste() {
    var tipo = document.getElementById('name')
    tipo.value = 'asdasd'
  }


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
          <select name="type" id="type" className={style.type}>
            <option key='1'>planta</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="">Id: </label>
          <input type="text" id="pokeId" />
        </div>
      </div>
      <button onClick={teste}> teste </button>


      <div className={style.card_container}>

        {pokemons.map((val) => {
          return (
            <div key={val.name}>
              <CardComponent
                poke_id={val.id}
                name={val.name}
                types={val.types}
                img={val.sprites.front_default} />

            </div>
          )
        })}





      </div>


    </div>
  )
}