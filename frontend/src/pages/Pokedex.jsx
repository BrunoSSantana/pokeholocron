import { useEffect, useState } from 'react'
import CardComponent from '../components/CardComponent'
import style from '../styles/stylePage/Pokedex.module.scss'

export default function Pokedex() {

  const [ pokemon, setPokemon ] = useState({
    name: "",
    img: "",
    types: [],
    poke_id: ""
  })

  useEffect(() => {

    setPokemon({
      name: "mewtwo",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg",
      types: ["psychic"],
      poke_id: "150"
    })
  }, [])



  return (
    <div className={style.pokedex_container}>

      <div className={style.header}>Pokedex</div>

      <div className={style.inputs}>
        <div className="input">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
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
      <div className={style.card_container}>

        <CardComponent poke_id="#009" name="Blastoise" types={["água"]} img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg" />
        <CardComponent poke_id={pokemon.poke_id} name={pokemon.name} types={pokemon.types} img={pokemon.img} />



      </div>


    </div>
  )
}