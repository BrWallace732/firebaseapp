import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {auth} from '../firebaseConfig'

const Menu = () => {

    const historial = useHistory()
    const [ususario, setUsusario] = useState(null)
    useEffect( ()=>{
        auth.onAuthStateChanged((user) =>{
            if( user ){
                setUsusario(user.email)
                console.log(user.email);
            }
        })
    },[])

    const CerrarSession = () => {
        auth.signOut()
        setUsusario(null)
        historial.push('/Login')
    }

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark' >
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item' >
                        <Link className="nav-link" to='/' >Inicio</Link>
                    </li>
                    <li className='nav-item' >
                    {
                        !ususario ?
                        (
                            <Link className="nav-link" to='/login' >login</Link>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                    </li>
                    <li className='nav-item' >
                    {
                        ususario ?
                        (
                            <Link className="nav-link" to='/admin' >admin</Link>                      
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                    </li>
                </ul>
                {
                    ususario ?
                    (
                        <button
                            onClick={CerrarSession}
                            className='btn btn-danger'
                        >Cerrar Secion</button>
                    )
                    :
                    (
                        <span></span>
                    )
                }
                </nav>
        </div>
    )
}

export default Menu
