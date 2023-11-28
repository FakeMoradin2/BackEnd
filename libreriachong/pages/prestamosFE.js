import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function Testdb() {
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [ID_Libro, setIDLibro] = useState('');
    const [ID_Alumno, setIDAlumno] = useState('');
    const [Fecha_Prestamo, setFechaPrestamo] = useState('');
    const [Fecha_Devolucion, setFechaDevolucion] = useState('');
    const [modifying, setModifying] = useState(false);
    const [modifyingId, setModifyingId] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await axios.get('/api/dbprestamos');
        const data = await res.data;
        setData(data);
    };

    const sendData = async () => {
        setLoading(true);

        if (
            ID_Libro === '' ||
            ID_Alumno === '' ||
            Fecha_Prestamo === '' ||
            Fecha_Devolucion === ''
        ) {
            toast.error('Llena todos los campos');
            setLoading(false);
            return;
        }

        try {
            const resultado = await axios.post('/api/dbprestamos', {
                ID_Libro: ID_Libro,
                ID_Alumno: ID_Alumno,
                Fecha_Prestamo: Fecha_Prestamo,
                Fecha_Devolucion: Fecha_Devolucion,
            });
            getData();
            toast.success('Datos enviados');
            console.log(resultado);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const eliminarPrestamo = async (id) => {
        console.log('Eliminar data', id);
        try {
            const resultado = await axios.delete(`/api/dbprestamos?id=${id}`);
            console.log(resultado);
            getData();
            toast.success('Datos eliminados');
        } catch (error) {
            console.log(error);
            toast.error('No se pudo eliminar');
        }
    };

    const modificarPrestamo = async (id) => {
        setModifyingId(id);
        setModifying(true);
        // Fetch the data for the selected id and set it to the corresponding state variables
        const selectedData = data.find((prestamo) => prestamo.ID_Prestamo === id);
        setIDLibro(selectedData.ID_Libro);
        setIDAlumno(selectedData.ID_Alumno);
        setFechaPrestamo(selectedData.Fecha_Prestamo);
        setFechaDevolucion(selectedData.Fecha_Devolucion);
    };

    const updatePrestamo = async () => {
        setLoading(true);

        try {
            const resultado = await axios.put(`/api/dbprestamos?id=${modifyingId}`, {
                ID_Libro: ID_Libro,
                ID_Alumno: ID_Alumno,
                Fecha_Prestamo: Fecha_Prestamo,
                Fecha_Devolucion: Fecha_Devolucion,
            });
            getData();
            toast.success('Datos modificados');
            console.log(resultado);
            setModifying(false);
            setModifyingId(null);
            // Clear the form fields after successful update
            setIDLibro('');
            setIDAlumno('');
            setFechaPrestamo('');
            setFechaDevolucion('');
        } catch (error) {
            console.log(error);
            toast.error('No se pudo modificar');
        }

        setLoading(false);
    };

    return (
        <>
            <Toaster position="bottom-center" />

            {/* Formulario */}
            <div className="flex flex-col mb-4">
                <input
                    className="border rounded py-2 px-3 mb-2 text-black"
                    type="text"
                    placeholder="ID libro"
                    value={ID_Libro}
                    onChange={(e) => setIDLibro(e.target.value)}
                />
                <input
                    className="border rounded py-2 px-3 mb-2 text-black"
                    type="text"
                    placeholder="ID alumno"
                    value={ID_Alumno}
                    onChange={(e) => setIDAlumno(e.target.value)}
                />
                <input
                    className="border rounded py-2 px-3 mb-2 text-black"
                    type="text"
                    placeholder="Fecha de préstamo"
                    value={Fecha_Prestamo}
                    onChange={(e) => setFechaPrestamo(e.target.value)}
                />
                <input
                    className="border rounded py-2 px-3 mb-2 text-black"
                    type="text"
                    placeholder="Fecha de devolución"
                    value={Fecha_Devolucion}
                    onChange={(e) => setFechaDevolucion(e.target.value)}
                />
            </div>

            <div className="flex mb-4">
                {loading ? (
                    <button className="bg-red-500 text-white py-2 px-4 rounded" disabled>
                        Detener
                    </button>
                ) : (
                    <button onClick={sendData} className="bg-green-500 text-white py-2 px-4 rounded">
                        Iniciar
                    </button>
                )}
            </div>

            <main className="h-screen w-screen bg-gray-500 p-4">
                {data.map((prestamo, i) => (
                    <div className="flex items-center justify-between bg-white p-4 mb-2 rounded" key={i}>
                        <div>
                            <h1 className="text-xl font-bold text-black">{prestamo.ID_Prestamo}</h1>
                            <p className="text-sm text-black">{prestamo.Fecha_Prestamo}</p>
                        </div>

                        {/* Botones para eliminar, modificar y formulario de modificación */}
                        <div className="flex items-center">
                            <button
                                className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                                onClick={() => eliminarPrestamo(prestamo.ID_Prestamo)}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                                onClick={() => modificarPrestamo(prestamo.ID_Prestamo)}
                            >
                                Modificar
                            </button>

                            {/* Formulario de modificación */}
                            {modifying && modifyingId === prestamo.ID_Prestamo && (
                                <div className="flex flex-col">
                                    <input
                                        className="border rounded py-2 px-3 mb-2 text-black"
                                        type="text"
                                        placeholder="ID libro"
                                        value={ID_Libro}
                                        onChange={(e) => setIDLibro(e.target.value)}
                                    />
                                    <input
                                        className="border rounded py-2 px-3 mb-2 text-black"
                                        type="text"
                                        placeholder="ID alumno"
                                        value={ID_Alumno}
                                        onChange={(e) => setIDAlumno(e.target.value)}
                                    />
                                    <input
                                        className="border rounded py-2 px-3 mb-2 text-black"
                                        type="text"
                                        placeholder="Fecha de préstamo"
                                        value={Fecha_Prestamo}
                                        onChange={(e) => setFechaPrestamo(e.target.value)}
                                    />
                                    <input
                                        className="border rounded py-2 px-3 mb-2 text-black"
                                        type="text"
                                        placeholder="Fecha de devolución"
                                        value={Fecha_Devolucion}
                                        onChange={(e) => setFechaDevolucion(e.target.value)}
                                    />
                                    <button
                                        onClick={updatePrestamo}
                                        className="bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Modificar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
}
