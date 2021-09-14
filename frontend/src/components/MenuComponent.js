import React from 'react'
import styles from '../styles/styleComponent/Menu.module.scss'
export default function MenuComponent(val) {
    return (
        <div className={styles.container}>
            <h1>Bem vindo: {val.user}</h1>
        </div>
    )
}
