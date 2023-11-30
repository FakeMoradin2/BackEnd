    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Toaster } from 'react-hot-toast';
    import toast from 'react-hot-toast';

    export default function Testdb() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaC, setFechaC] = useState('');
    const [idLibro, setIdLibro] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
        const res = await axios.get('/api/dbcategorias');
        setData(res.data);
        } catch (error) {
        console.log(error);
        }
    };

    const sendData = async () => {
        setLoading(true);

        if (!nombre || !descripcion || !fechaC || !idLibro) {
        toast.error('Llena todos los campos');
        setLoading(false);
        return;
        }

        try {
        if (editingId) {
            // Si hay un ID de edición, realizar una solicitud PUT para actualizar
            await axios.put(`/api/dbcategorias?id=${editingId}`, {
            Nombre: nombre,
            Descripcion: descripcion,
            FechaC: fechaC,
            idLibro: idLibro,
            idCategoria: editingId,
            });
            setEditingId(null); // Limpiar el ID de edición después de la actualización
            toast.success('Datos actualizados');
        } else {
            // Si no hay un ID de edición, realizar una solicitud POST para agregar nuevos datos
            await axios.post('/api/dbcategorias', {
            Nombre: nombre,
            Descripcion: descripcion,
            FechaC: fechaC,
            idLibro: idLibro,
            });
            toast.success('Datos enviados');
        }

        getData();
        } catch (error) {
        console.log(error);
        toast.error('Error al enviar datos: ' + error.message);
        }

        setLoading(false);
        resetForm();
    };

    const eliminarData = async (id) => {
        try {
        const resultado = await axios.delete(`/api/dbcategorias?id=${id}`);
        console.log(resultado);
        getData();
        toast.success('Datos eliminados');
        } catch (error) {
        console.log(error);
        toast.error('No se pudo eliminar los datos: ' + error.message);
        }
    };

    const editarData = (categoria) => {
        setNombre(categoria.Nombre_Categoria);
        setDescripcion(categoria.Descripcion);
        setFechaC(categoria.Fecha_Creacion);
        setIdLibro(categoria.ID_Libro);
        setEditingId(categoria.ID_Categoria);
    };

    const resetForm = () => {
        setNombre('');
        setDescripcion('');
        setFechaC('');
        setIdLibro('');
    };

    return (
        <>
        <Toaster position='bottom-center' />

        <div className='flex flex-col space-y-2'>
            <input
            className='p-2 rounded-md border text-black'
            type='text'
            placeholder='Nombre de la categoría'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
            <input
            className='p-2 rounded-md border text-black'
            type='text'
            placeholder='Descripción'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            />
            <input
            className='p-2 rounded-md border text-black'
            type='date'
            placeholder='Fecha de creación'
            value={fechaC}
            onChange={(e) => setFechaC(e.target.value)}
            />
            <input
            className='p-2 rounded-md border text-black'
            type='text'
            placeholder='Id del libro'
            value={idLibro}
            onChange={(e) => setIdLibro(e.target.value)}
            />
        </div>

        <div className='flex space-x-2'>
            <button onClick={sendData} className='p-2 bg-green-500 rounded-md'>
            {editingId ? 'Actualizar' : 'Enviar'}
            </button>
            <button onClick={resetForm} className='p-2 bg-blue-500 rounded-md'>
            Limpiar
            </button>
        </div>

        <main className='h-screen w-screen bg-gray-200 p-4'>
            {data.map((categoria, i) => (
            <div
                key={i}
                className='bg-white p-4 rounded-md shadow-md mb-4 flex items-center justify-between'
            >
                <div>
                <h1 className='text-xl font-bold text-black'>{categoria.Nombre_Categoria}</h1>
                <p className='text-black'>{categoria.Descripcion}</p>
                <p className='text-black'>{categoria.Fecha_Creacion}</p>
                <p className='text-black'>{categoria.ID_Libro}</p>
                </div>
                <div className='space-x-2'>
                <button
                    onClick={() => editarData(categoria)}
                    className='p-2 bg-yellow-500 rounded-md'
                >
                    Editar
                </button>
                <button
                    onClick={() => eliminarData(categoria.ID_Categoria)}
                    className='p-2 bg-red-500 rounded-md'
                >
                    Eliminar
                </button>
                </div>
            </div>
            ))}
        </main>
        </>
    );
    }
