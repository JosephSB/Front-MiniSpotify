import React,{useState} from 'react';
import css from '../../styles/Auth.module.css'
import { helpHttp } from '../../Helpers/helpHttp'
import Btn1 from '../../Components/Buttons/Btn1';
import Link from 'next/link'
import Router from 'next/router';

const formDefault = {
    Username: "",
    Password: "",
    Email: "",
    Name: "",
    LastName: ""
}

const Register = () =>{
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
        let url = process.env.NEXT_PUBLIC_API_KEY_ADDUSER

        if(form.Name.length > 3 && form.LastName.length > 3){
            helpHttp().post(url,options).then(res => {
                if(res.operation){
                    Router.push('/Auth/Login')
                }else setMessageError(res.data)
            })
        }else setMessageError("Ingrese sus nombres")
    }
    
    return(
        <div className={css.container}>
            <h1 className={css.Tittle}>Register</h1>
            <p className={css.SpanError}>{messageError}</p>
            <form className={css.Form} onSubmit={handleSubmit}>
                <input className={css.input} type="text" 
                onChange={handleChange}
                name="Username" placeholder="Username"
                />
                <input className={css.input} type="text" 
                onChange={handleChange}
                name="Name" placeholder="Name"
                />
                <input className={css.input} type="text" 
                onChange={handleChange}
                name="LastName" placeholder="LastName"
                />
                <input className={css.input} type="email" 
                onChange={handleChange}
                name="Email" placeholder="Email"
                />
                <input className={css.input} type="password" 
                onChange={handleChange} placeholder="Password"
                name="Password" suggested= "current-password"
                />
                <Btn1 name={"Registrar"} action={handleSubmit} />
                <br/>
                <Link href="/Auth/Login">
                    <span className={css.span}>¿Ya tienes cuenta?, Incia Sesion!</span>
                </Link>
            </form>
        </div>
    )
}

export default Register