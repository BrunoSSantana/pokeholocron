import React, { useState } from 'react'
import styles from '../styles/stylePage/Login.module.scss'
import { useHistory } from "react-router";
import Axios from 'axios';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

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

    function checkLogin() {
        Axios.post('http://localhost:3003/signin', {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response)
            if (!response.data) {
                //User Não encontrado
                //falta receber o tratamento
                alert('Usuário, email e/ou senha ja existem')
            }else {
                //Usuário encontrado
                localStorage.setItem('token', response.data.token) 
                localStorage.setItem('email', response.data.trainer.email)
                localStorage.setItem('id', response.data.trainer.id)
                localStorage.setItem('nick_name', response.data.trainer.nick_name) 
                history.push('/')
            }
        })
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
                        <a ><button className={styles.button1} onClick={checkLogin}>Login</button></a>
                        <a href='/Register'><button className={styles.button2} >Create account</button></a>
                    </div>


                </div>
            </div>

        </div>
    )
}
