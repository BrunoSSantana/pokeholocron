import React from 'react'
import styles from '../styles/stylePage/Register.module.scss'

export default function Register() {

    function mostrarSenha() {
        var tipo = document.getElementById('senha')
        var check = document.getElementById('mostrar')
        if (tipo.type === "password") {
            check.checked = true
            tipo.type = "text"
        } else {
            tipo.type = "password"
            check.checked = false
        }
    }

  

    return (
        <div className={styles.container}>
        <div className={styles.imagem}>

        </div>

        <div className={styles.right}>
            <div className={styles.login} >
                <h1>Register</h1>
                
                <div className={styles.registerContainer}>
                    <div className={styles.iconPerfil}></div>
                    <input type='name' placeholder='Your name'></input>
                </div>

                <div className={styles.registerContainer}>
                    <div className={styles.iconEmail}></div>
                    <input type='email' placeholder='Your e-mail'></input>
                </div>

                <div className={styles.registerContainer}>
                    <div className={styles.iconSenha}></div>
                    <input type='password' id='senha' placeholder='Your password'></input>
                </div>
                <button onClick={mostrarSenha} className={styles.ocultar}><input id='mostrar' value='pass' type='checkbox' />Show password</button>
                <a href='/login'  className={styles.createAccount}><button >Create account</button></a>
               
            </div>
        </div>

    </div>
    )
}
