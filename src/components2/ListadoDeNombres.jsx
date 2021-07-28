import React, {useState} from 'react'
import uniqid from 'uniqid'

export const ListadoDeNombres = () => {

    const [nombre, setNombre] = useState('')
    const [listaDeNombres, setListaDeNombres] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (e) => {
        e.preventDefault()
        if(!nombre.trim()){
            setError('el campo esta vacio')
            return
        }
        const nuevoNombre = {
            id:uniqid(),
            tituloNombre:nombre
        }
        setListaDeNombres([...listaDeNombres,nuevoNombre])
        setNombre('')
        setError(null)
    }
    const deleteNombre = (id)=>{
        const nuevaArray = listaDeNombres.filter( item => item.id !== id)
        setListaDeNombres(nuevaArray)
    }
    const  editar = (item) =>{
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }
    const editarNombre = (e) =>{
        e.preventDefault()
        const nuevoArray = listaDeNombres.map( item => item.id === id ? {id:id, tituloNombre:nombre} : item )
        setListaDeNombres(nuevoArray)
    }


    return (
        <div>
            <h2>Aplicacion de CRUD</h2>
            <div className="row" >
                <div className="col" >
                    <h2>Listado de nombres</h2>
                    <ul className="list-group" >
                        {
                            listaDeNombres.map( item =>
                                <li 
                                    className="list-group-item"
                                    key={item.id}>
                                    {item.tituloNombre}
                                    <button 
                                        className="btn btn-danger float-end"
                                        onClick={ ()=>{deleteNombre(item.id)} }
                                    >
                                            BORRAR
                                    </button>
                                    <button 
                                        className="btn btn-info float-end"
                                        onClick={ ()=>{editar(item)} }
                                    >
                                            Editar
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="col" >
                    <h2>Formulario para añadir nombres</h2>

                    <form 
                        onSubmit={modoEdicion ? editarNombre: addNombre } 
                        className="form-group" >
                            <input 
                                className="form-control  mb-3" 
                                type="text" 
                                placeholder="introduce el nombe" 
                                onChange={(e)=>{setNombre(e.target.value)}}
                                value={nombre}
                            />
                            <input 
                                className="btn btn-info btn-block" 
                                type="submit" 
                                value={modoEdicion ? 'Editar Nombre':'Registrar'} 
                            />
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger" >
                                {error}
                            </div>
                        ):(
                            <div></div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default ListadoDeNombres
