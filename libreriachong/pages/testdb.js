import axios from 'axios';
import { useEffect, useState } from 'react';

//peticion a la api
export async function getServerSideProps(){
    const res = await axios.get('http://localhost:3000/api/dbpage')
    const data = await res.data
    return{
        props: {
            data
        }
    }
}

export default function Testdb({data}){
    console.log(data)
    return(
        <main className='h-screen w-screen bg-gray-500'>
            
        {data.map((alumno) =>(
            <div className='flex' key={alumno.id}>
                <h1>{alumno.nombre}</h1>
                <h2>{alumno.apellido}</h2>
            </div>
        ))}
        </main>
    )
}