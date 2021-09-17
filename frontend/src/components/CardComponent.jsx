import { useEffect, useRef } from 'react';
import style from '../styles/styleComponent/CardComponent.module.scss'
import { SetTypeColor } from '../utils/SetTypeColor'
import Axios from 'axios';

export default function CardComponent({ pokemon }) {
  const divFlipHover = useRef(null);
  const cardBackRef = useRef(null);
  const innerRef = useRef(null);

  const {
    name,
    img,
    types,
    poke_id,
    abilities,
    weight,
    attack,
    defense,
    height
  } = pokemon

  const cardBackgroundColor = `${SetTypeColor(types[0])}99`;

  async function handleCatch() {
    //função para salvar no banco
    Axios.post('http://localhost:3003/pokemons', {
      poke_id: poke_id, 
      name: name, 
      types: types, 
      image: img,
      weight: weight, 
      height:height, 
      attack: attack, 
      defense: defense, 
      abilities: abilities, 
      trainer_id: localStorage.getItem('id'),
        },{
          headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        }).then((response) => {      
          console.log('adicionou o types: ', response)  
            if (!response.data) {
                //pokemon error
                //falta receber o tratamento
                alert('Usuário, email e/ou senha ja existem')
            }else {
                //pokemon adicionado
                alert('você capturou o:  ' + response.data.name)
            }
        })

    //
  }

  useEffect(() => {
    divFlipHover.current.addEventListener("mouseenter", () => {
      innerRef.current.style.transform = 'rotateY(180deg)';
    });
    cardBackRef.current.addEventListener("mouseleave", () => {
      innerRef.current.style.transform = 'rotateY(0)';
    });
  }, []);

  return (
    <div className={style.card}>
      <div className={style.inner} ref={innerRef}>

        <div
          className={style.card_front}
          style={{ background: cardBackgroundColor }}
        >
          <div className={style.poke_id}>
            <span>{`#${poke_id}`}</span>
          </div>

          <div className={style.content_main} ref={divFlipHover}>
            <img src={img} alt="" />
          </div>

          <h3>{name}</h3>

          <div className={style.poke_type}>
            
          </div>

          <button onClick={handleCatch}>
            <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/48/000000/external-pokeball-video-games-those-icons-lineal-color-those-icons.png" alt="pokebola" />
            <div className={style.buttonLegend}>
              Capturar
            </div>
          </button>
        </div>

        <div
          className={style.card_back}
          style={{ background: cardBackgroundColor }}
          ref={cardBackRef}
        >
          <div className={style.logoContainer}>
            <img src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo.png" alt="logo" />
          </div>

          <div className={style.main}>
            <div className={style.attribute}>
              <strong>Peso: </strong>
              <p>{weight}</p>
            </div>
            <div className={style.attribute}>
              <strong>Ataque: </strong>
              <p>{attack}</p>
            </div>
            <div className={style.attribute}>
              <strong>Defesa: </strong>
              <p>{defense}</p>
            </div>

            <strong>Habilidades: </strong>
            {abilities.map((ability, index) => (
              <div className={style.attribute} key={index}>
                <p>{ability.ability.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}