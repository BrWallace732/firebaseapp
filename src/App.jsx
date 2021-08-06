import React, {useState, useEffect} from 'react'
import {store} from './firebaseconf'

function App() {
    const [modoEdicion, setModoEdicion] = useState(null)
    const [idUsuario, setIdUsuario] = useState('')
    const [nombre, setNombre] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [usuario, setUsuario] = useState([])

    useEffect(() => {
        const getUsuario = async()=> {
            const { docs } = await store.collection('agenda').get()
            const nuevoArray =  docs.map( item => ({ id: item.id, ...item.data() }) )
            setUsuario(nuevoArray)
        }
        getUsuario()
    }, [])

    const setUsuarios = async(e) => {
        e.preventDefault()
        if(!nombre.trim()){
            setError('el campo nombre esta vacio')
        }else if(!phone.trim()){
            setError('el campo telefono esta vacio')
        }
        const usuario = {
            nombre:nombre,
            telefono:phone
        }
        try{
            const data = await store.collection('agenda').add(usuario)
            const { docs } = await store.collection('agenda').get()
            const nuevoArray =  docs.map( item => ({ id: item.id, ...item.data() }) )
            setUsuario(nuevoArray)
            alert('usuario añadido')
        }catch(e) {
            console.log(e);
        }
        setNombre(' ')
        setPhone(' ')        
    }
    const BorrarUsuario = async(id)=>{
        try {
            await store.collection('agenda').doc(id).delete()
            const { docs } = await store.collection('agenda').get()
            const nuevoArray =  docs.map( item => ({ id: item.id, ...item.data() }) )
            setUsuario(nuevoArray)
        } catch (e) {
            console.log(e);
        }
    }
    const Actualizar = async(id)=>{
        try {
            const data = await store.collection('agenda').doc(id).get()
            const {nombre, telefono} = data.data()
            setNombre(nombre)
            setPhone(telefono)
            setIdUsuario(id)

            setModoEdicion(true)
        } catch (e) {
            console.log(e);
        }
    }
    const setUpdate = async(e)=>{
        e.preventDefault()
        if(!nombre.trim()){
            setError('el campo nombre esta vacio')
        }else if(!phone.trim()){
            setError('el campo telefono esta vacio')
        }
        const usuarioUpdate = {
            nombre: nombre,
            telefono: phone
        }
        try {
            await store.collection('agenda').doc(idUsuario).set(usuarioUpdate)
            const { docs } = await store.collection('agenda').get()
            const nuevoArray =  docs.map( item => ({ id: item.id, ...item.data() }) )
            setUsuario(nuevoArray)
        } catch (e) {
            console.log(e);
        }
        setNombre('')
        setPhone('')
        setIdUsuario('')
        setModoEdicion(false)

    }
    return (
        <div className="container" >
            <div className="row">
                <div className="col">
                    <h2>Formulario de usuario</h2>
                    <form onSubmit={modoEdicion ? setUpdate : setUsuarios} className="form-group d-grid gap-2" >
                        <input
                            value={nombre} 
                            onChange={(e)=>{setNombre(e.target.value)}}
                            className="form-control" type="text" placeholder="nombre" />
                        <input 
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                            className="form-control mt-3" type="text" placeholder="telefono" />
                            {
                                modoEdicion ?
                                (
                                    <input type="submit" value="Actualizar" className="btn btn-dark btn-block mt-3" />
                                )
                                :
                                (
                                    <input type="submit" value="Registrar" className="btn btn-dark btn-block mt-3" />
                                )
                            }
                    </form>
                    {
                        error ? 
                        (
                            <div>
                                <p>{error}</p>
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                </div>
                <div className="col">
                    <h2>Lista de contactos</h2>
                    <ul className="list-group">
                    {
                        usuario.length !== 0 ?
                        (
                            usuario.map( item => (
                                <li key={item.id}
                                    className="list-group-item"
                                >{item.nombre} -- {item.telefono}
                                <button 
                                    onClick={(id)=>{BorrarUsuario(item.id)}}
                                    className="btn btn-danger float-end" >Borrar</button>
                                <button 
                                    onClick={(id)=>{Actualizar(item.id)}}
                                    className="btn btn-info float-end mx-3" >Actualizar</button>
                                </li>
                            ))
                        )
                        :
                        (
                            <span>
                                no hay contactos en la agenda
                            </span>
                        )
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default App
