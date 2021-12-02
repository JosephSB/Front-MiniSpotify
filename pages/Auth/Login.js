import React,{useState} from 'react';
import Btn1 from '../../Components/Buttons/Btn1';
import Link from 'next/link'
import css from '../../styles/Auth.module.css'
import { helpHttp } from '../../Helpers/helpHttp'

const formDefault = {
    Username: "",
    Password: ""
}

const Login = () =>{
    const [form, setForm] = useState(formDefault);
    const [messageError, setMessageError] = useState("");

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        let options = {
            body: form
        }
        let url = process.env.NEXT_PUBLIC_API_KEY_VALIDARUSER

        helpHttp().post(url,options).then(res => {
            if(res.operation){
                window.sessionStorage.setItem('token', res.data.Token);
                window.location.href = "/"
            }else setMessageError(res.data)
        })
    }


    return (
        <div className={css.container}>
            <h1 className={css.Tittle}>Login</h1>
            <p className={css.SpanError}>{messageError}</p>
            <form className={css.Form} onSubmit={handleSubmit}>
                <input className={css.input} type="text" 
                onChange={handleChange} placeholder="Username"
                name="Username" />
                <input className={css.input} type="password" 
                onChange={handleChange} placeholder="password"
                name="Password" suggested= "current-password"/>
                <Btn1 name={"Inicia Sesion"} action={handleSubmit} />
                <br/>
                <Link href="/Auth/Register">
                    <span className={css.span}>¿No tienes cuenta?, ¡Registrate!</span>
                </Link>
            </form>
        </div>
    )
}

export default Login