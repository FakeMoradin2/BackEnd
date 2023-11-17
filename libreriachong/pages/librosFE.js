import axios from 'axios';
import { useEffect, useState } from 'react';

//peticion a la api
export async function getServerSideProps(){
    const res = await axios.get('http://localhost:3000/api/dblibros')
    const data = await res.data
    return{
        props: {
            data
        }
    }
}

export default function Testdb({data}){
    const [loading, setLoading] = useState(false);
    const [titulo, setNombre] = useState('');

    const handlerLoading = () => {
        setLoading(true)
        setTimeout(() =>{
            setLoading(false)
        }, 10000)
    }
    console.log(data)
    return(
        <>
        <div className='flex'>
            {}
            {loading ? (
                <button className='bg-red-500' disabled>detener</button>
            ) : (
                <button className='bg-green-500' onClick={handlerLoading}>iniciar</button>
            )}

        </div>
        <main className='h-screen w-screen bg-gray-500'>
            
        {data.map((libro) =>(
            <div className='flex' key={libro.id}>
                <h1>{libro.titulo}</h1>
                <h2>{libro.editorial}</h2>
            </div>
        ))}
        </main>
        </>
    )
}