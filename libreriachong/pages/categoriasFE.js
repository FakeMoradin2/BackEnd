import axios from 'axios';
import { useEffect, useState } from 'react';

//peticion a la api
export async function getServerSideProps(){
    const res = await axios.get('http://localhost:3000/api/dbcategorias')
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
            
        {data.map((categoria) =>(
            <div className='flex' key={categoria.id}>
                <h1>{categoria.Nombre_Categoria}</h1>
                <h2>{categoria.Descripcion}</h2>
            </div>
        ))}
        </main>
    )
}