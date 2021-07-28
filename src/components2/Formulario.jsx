import React, {useState} from 'react'

export const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState('')

    const validar = (e) =>{
        e.preventDefault()
        console.log('pulsado')
        if(!nombre.trim() || !edad.trim()){
            console.log('faltan datos')
            return
        }
    }

    return (
        <div className="container">
            <form onSubmit={validar} className="form-group" >
                <input 
                    placeholder="introduce el nombre" 
                    className="form-control mb-3" 
                    type="text"
                    onChange={ (e) =>{setNombre(e.target.value)}}
                />
                <input 
                    placeholder="introduce la edad" 
                    className="form-control mb-3" 
                    type="text"
                    onChange={ (e) =>{setEdad(e.target.value)}}
                />
                <input 
                    className="btn btn-info btn-block" 
                    type="submit" 
                />
            </form>
        </div>
    )
}

export default Formulario