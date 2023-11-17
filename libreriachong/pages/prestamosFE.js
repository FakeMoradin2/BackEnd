import axios from 'axios';
import { useEffect, useState } from 'react';

//peticion a la api
export async function getServerSideProps(){
    const res = await axios.get('http://localhost:3000/api/dbprestamos')
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
            
        {data.map((prestamo) =>(
            <div className='flex' key={prestamo.id}>
                <h1>{prestamo.ID_Alumno}</h1>
                <h2>{prestamo.Fecha_Prestamo}</h2>
            </div>
        ))}
        </main>
    )
}