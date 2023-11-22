import axios from 'axios';
import {useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

//peticion a la api
// export async function getServerSideProps(){
//     const res = await axios.get('http://localhost:3000/api/dblibros')
//     const data = await res.data
//     return{
//         props: {
//             data
//         }
//     }
// }

export default function Testdb(){
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [paginas, setPaginas] = useState('');
    const [editorial, setEditorial] = useState('');
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await axios.get('/api/dblibros')
        const data = await res.data
        setData(data)
    }



    const handlerLoading = () => {
        setLoading(true)
        setTimeout(() =>{
            setLoading(false)
        }, 10000)
    }
    console.log(data)
    const sendData = async () => {
        setLoading(true);
        console.log('sendData');
        console.log(titulo, autor, paginas, editorial, categoria);
        if(titulo === '' || autor === '' || paginas === '' || editorial === '' || categoria === ''){
            toast.error('llena todos los campos');
            setLoading(false);
            return;
        }
        try{
            const resultado = axios.post("/api/dblibros", {
                titulo : titulo,
                autor : autor,
                paginas : paginas,
                editorial : editorial,
                categoria : categoria
            })
            getData();
            toast.success('datos enviados');
            console.log(resultado)
        }
        catch(error){
            console.log(error)
        }
        setLoading(false);
    }
    const eliminarData = async (id) => {
        console.log('eliminar data', id);
        try{
            const resultado = await axios.delete(`/api/dblibros?id=${id}`)
            console.log(resultado)
            getData();
            toast.success('datos eliminados')
        }
        catch(error){
            console.log(error);
            toast.error("no se pudo eliminar");
        }
    }
    return(
        <>
        <Toaster position='bottom-center'/>
        {/*formulario*/}
        <div className='flex flex-col'>
            <input className='text-black' type="text" placeholder='Titulo' onChange={(e) => setTitulo(e.target.value)} />
            <input className='text-black' type="text" placeholder='autor' onChange={(e) => setAutor(e.target.value)} />
            <input className='text-black' type="text" placeholder='paginas' onChange={(e) => setPaginas(e.target.value)} />
            <input className='text-black' type="text" placeholder='editorial' onChange={(e) => setEditorial(e.target.value)} />
            <input className='text-black' type="text" placeholder='categoria' onChange={(e) => setCategoria(e.target.value)} />
        </div>
        <div className='flex'>
            {}
            {loading ? (
                <button className='bg-red-500' disabled>detener</button>
            ) : (
                <button onClick={sendData} className='bg-green-500'>iniciar</button>
            )}

        </div>
        <main className='h-screen w-screen bg-gray-500'>
            
        {data.map((libro, i) =>(
            <div className='flex' key={i}>
                <h1>{libro.titulo}</h1>
                <h2>{libro.editorial}</h2>
                {/* Boton para eliminar */}
                <button className='bg-red-500' onClick={()=>eliminarData(libro.PKid)}>eliminar</button>
            </div>
        ))}
        </main>
        </>
    )
}