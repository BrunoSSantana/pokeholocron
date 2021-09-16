import { useEffect, useState, useContext } from 'react'
import CardComponent from '../components/CardComponent'
import style from '../styles/stylePage/Pokedex.module.scss'
import Axios from 'axios';
import { PokemonsContext } from '../context/PokemonsContext';

export default function Pokedex() {

  const [name, setName] = useState('')
  const [typePokemon, setTypePokemon] = useState('')
  const [pokeId, setPokeId] = useState('')

  const { pokemons, setpokemons } = useContext(PokemonsContext)

  function FilterPokedex(){
    Axios.get('http://localhost:3003/pokemons/', {
      trainer:localStorage.getItem('id')
    }).then((response) => {   
      console.log(response)        
       
      
    })

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
          <select name="type" id="type" className={style.type} onChange={(e) => { setTypePokemon(e.target.value) }}>
            <option key='fire'>fire</option>
          </select>
        </div>

        <div className="input">
          <label htmlFor="">Id: </label>
          <input type="text" id="pokeId" onChange={(e) => { setPokeId(e.target.value) }}/>
        </div>
      </div>

      <button onClick={FilterPokedex}>FilterPokedex</button>


      <div className={style.card_container}>

   

      </div>


    </div>
  )
}