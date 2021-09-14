import React from 'react'
import styles from '../styles/styleComponent/TitleComponent.module.scss'
export default function TitleComponent(val) {
    return (
        <div className={styles.container}>
            <h1>{val.title}</h1>
        </div>
    )
}
