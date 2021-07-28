import React, {useState} from 'react'

export const Temperatura = () => {

    const [temperatura, setTemperatura] = useState(19)
    const subir = () => {
        setTemperatura(temperatura+1)
    }
    const bajar = () => {
        setTemperatura(temperatura-1)
    }

    return (
        <div className="container" >
            <h2>La temperatura es: {temperatura} </h2>
            <p>
                {
                    temperatura > 21 ? 'hace calor' : 'hace frio'
                }
            </p>
            <button className="btn btn-success btn-block" onClick={subir} >Aumentar</button>
            <button className="btn btn-danger btn-block" onClick={bajar} >Reducir</button>
        </div>
    )
}

export default Temperatura
