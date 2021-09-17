import React, { useState } from 'react'
import styles from '../styles/stylePage/Register.module.scss'
import Axios from 'axios';
import { useHistory } from "react-router";

export default function Register() {

    const [name, setName] = useState('')
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

    async function register() {
        try {
            const response = await Axios.post('http://localhost:3003/SignUp', {
                nick_name: name,
                email: email,
                password: password,
            })
            if (response.data.message) {
                //User Não encontrado
                alert('Usuário e/ou Email ja existem')
            } else {
                //Usuário encontrado
                localStorage.setItem('token', response.data.token)
                history.push('/login')
            }

        } catch (error) {
            return console.log('asdaa')

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
                        <input type='name' placeholder='Your name' onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className={styles.registerContainer}>
                        <div className={styles.iconEmail}></div>
                        <input type='email' placeholder='Your e-mail' onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>

                    <div className={styles.registerContainer}>
                        <div className={styles.iconSenha}></div>
                        <input type='password' id='senha' placeholder='Your password' onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>
                    <button onClick={mostrarSenha} className={styles.ocultar}><input id='mostrar' value='pass' type='checkbox' />Show password</button>
                    <button onClick={register}>Create account</button>
                </div>
            </div>
        </div>
    )
}
