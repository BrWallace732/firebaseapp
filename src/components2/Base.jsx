import React, {useState, useEffect} from 'react'

const Base = () => {

    const [nombre, setNombre] = useState('pedro')
    useEffect ( ()=>{
        setTimeout( ()=>{
            setNombre('manual')
        },2000)
    })


    return (
        <div>
            <h1>pagina de base</h1>
            {nombre}
        </div>
    )
}

export default Base
