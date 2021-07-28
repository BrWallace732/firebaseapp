import React from 'react'
import { useParams } from 'react-router-dom'

const Inicio = () => {

    const { nombre } = useParams()
    return (
        <div>
            <h1>Pagina de inicio</h1>
            {nombre}

        </div>
    )
}

export default Inicio
