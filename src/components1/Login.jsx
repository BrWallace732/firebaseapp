import React, {useState} from 'react'
import { auth } from '../firebaseConfig'
import { useHistory } from "react-router-dom";

const Login = () => {

    const historial = useHistory()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const RegistrarUsuario = (e)=>{
        e.preventDefault()
        
        auth.createUserWithEmailAndPassword(email, pass)
            .then( r=> {
                historial.push('/')
            } )
            .catch(e=>{
                console.log(e.code);
                if(e.code === 'auth/invalid-email'){
                    setError('email incorrecto')
                }
                if(e.code === 'auth/weak-password'){
                    setError('La password debil ')
                }
            })
    }

    const LoginUsuario = () => {
        auth.signInWithEmailAndPassword(email, pass)
        .then( (r)=> {
            historial.push('/')
        } )
        .catch ( (err)=>{
            console.log(err);
            if(err.code === 'auth/wrong-password'){
                setError('password incorrecto')
            }
        })
    }

    return (
        <div className='row mt-5' >
            <div className='col' ></div>
            <div className='col' >
                <form
                    onSubmit={RegistrarUsuario} 
                    className='form-group' >
                    <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        className='form-control' 
                        type='email' 
                        placeholder="introduce email" />
                    <input 
                        onChange={(e)=>{setPass(e.target.value)}}
                        className='form-control mt-3' 
                        type='password' 
                        placeholder="introduce PASSWORD" />
                    <input
                        className='btn btn-dark btn-block mt-3' 
                        value='Registrar Usuario' 
                        type="submit" />
                </form>
                <button className='btn btn-success btn-block'
                    onClick={LoginUsuario}
                >
                    Iniciar sesion
                </button>
                {
                    error != null ? 
                    (
                        <div>
                            {error}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className='col' ></div>
        </div>
    )
}

export default Login
