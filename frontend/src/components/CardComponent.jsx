import style from '../styles/stylePage/Pokedex.module.scss'

export default function CardComponent({name, img, types, poke_id}) {
  return (
    <div className={style.card}>
      <div className={style.poke_id}>
        <span>{poke_id}</span>
      </div>
      <div className={style.content_main}>
        <img src={img} alt="" />
      </div>
      <p>{name}</p>
      <div className={style.poke_type}>
        <span>
          {types.map(type => (
            <p>{type}</p>
          ))}

        </span>
      </div>
      <button>
        <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/48/000000/external-pokeball-video-games-those-icons-lineal-color-those-icons.png" alt="pokebola" />
      </button>
    </div>
  )
}