import React, { useState } from 'react'
import styles from '../styles/stylePage/Login.module.scss'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

    function checkLogin(){
        console.log(email)
    }


    return (
        <div className={styles.container}>
            <div className={styles.imagem}>

            </div>

            <div className={styles.right}>
                <div className={styles.login} >
                    <h1>Wellcome!</h1>
                    <p>Accessing this course requires a login, please enter your credential below!</p>
                    <div className={styles.LoginContainer}>
                        <div className={styles.iconEmail}></div>
                        <input type='email' placeholder='Your e-mail' onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>

                    <div className={styles.LoginContainer}>
                        <div className={styles.iconSenha}>

                        </div>
                        <input type='password' id='senha' placeholder='Your password' onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>

                    <div className={styles.ocultar}>
                        <button onClick={mostrarSenha}><input id='mostrar' value='pass' type='checkbox' />Show password</button>
                        <a href='/#'>Forgot password?</a>
                    </div>

                    <div className={styles.final}>
                        <a href='/'><button className={styles.button1} onClick={checkLogin}>Login</button></a>
                        <a href='/Register'><button className={styles.button2} >Create account</button></a>
                    </div>


                </div>
            </div>

        </div>
    )
}
