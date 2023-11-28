import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function Testdb() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [paginas, setPaginas] = useState('');
  const [editorial, setEditorial] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modifying, setModifying] = useState(false);
  const [modifyingId, setModifyingId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get('/api/dblibros');
      setData(res.data);
    } catch (error) {
      console.error(error); // Agrega esta línea para imprimir el error en la consola
      toast.error('Error al obtener datos');
    }
  };

  const sendData = async () => {
    setLoading(true);

    if (titulo === '' || autor === '' || paginas === '' || editorial === '' || categoria === '') {
      toast.error('Llena todos los campos');
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/dblibros", {
        titulo: titulo,
        autor: autor,
        paginas: paginas,
        editorial: editorial,
        categoria: categoria
      });
      await getData();
      toast.success('Datos enviados');
    } catch (error) {
      console.log(error);
      toast.error("No se pudo enviar los datos");
    }

    setLoading(false);
  };

  const eliminarData = async (id) => {
    try {
      await axios.delete(`/api/dblibros?id=${id}`);
      await getData();
      toast.success('Datos eliminados');
    } catch (error) {
      console.log(error);
      toast.error("No se pudo eliminar");
    }
  };

  const modificarData = async (id) => {
    setModifyingId(id);
    setModifying(true);
    // Fetch the data for the selected id and set it to the corresponding state variables
    const selectedData = data.find((libro) => libro.PKid === id);
    setTitulo(selectedData.titulo);
    setAutor(selectedData.autor);
    setPaginas(selectedData.paginas);
    setEditorial(selectedData.editorial);
    setCategoria(selectedData.categoria);
  };

  const updateData = async () => {
    setLoading(true);
  
    try {
      await axios.put(`/api/dblibros?id=${modifyingId}`, {
        titulo: titulo,
        autor: autor,
        paginas: paginas,
        editorial: editorial,
        categoria: categoria
      });
  
      // Asegúrate de que la actualización del estado ocurra después de la llamada a la API
      await getData();
      
      toast.success('Datos modificados');
      setModifying(false);
      setModifyingId(null);
      // Clear the form fields after successful update
      setTitulo('');
      setAutor('');
      setPaginas('');
      setEditorial('');
      setCategoria('');
    } catch (error) {
      console.log(error);
      toast.error('No se pudo modificar');
    }
  
    setLoading(false);
  };
  

  return (
    <>
      <Toaster position='bottom-center' />
      {/* Formulario */}
      <div className='flex flex-col p-4 bg-gray-200'>
        <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Autor' value={autor} onChange={(e) => setAutor(e.target.value)} />
        <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Paginas' value={paginas} onChange={(e) => setPaginas(e.target.value)} />
        <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Editorial' value={editorial} onChange={(e) => setEditorial(e.target.value)} />
        <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </div>
      <div className='flex'>
        {loading ? (
          <button className='bg-red-500 text-black p-2 mx-2 rounded' disabled>Detener</button>
        ) : (
          <button onClick={sendData} className='bg-green-500 text-black p-2 mx-2 rounded'>Iniciar</button>
        )}
      </div>
      <main className='h-screen w-screen bg-gray-300 p-4'>
        {data.map((libro, i) => (
          <div className='flex items-center justify-between p-2 mb-2 bg-white rounded' key={i}>
            <div>
              <h1 className='text-black'>{libro.titulo}</h1>
              <h2 className='text-black'>{libro.editorial}</h2>
            </div>
            <div className='flex items-center'>
              {/* Botones para eliminar, modificar y formulario de modificación */}
              <button className='bg-red-500 text-black p-2 mx-2 rounded' onClick={() => eliminarData(libro.PKid)}>Eliminar</button>
              <button className='bg-blue-500 text-black p-2 mx-2 rounded' onClick={() => modificarData(libro.PKid)}>Modificar</button>

              {/* Formulario de modificación */}
              {modifying && modifyingId === libro.PKid && (
                <div className='flex flex-col'>
                  <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                  <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Autor' value={autor} onChange={(e) => setAutor(e.target.value)} />
                  <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Paginas' value={paginas} onChange={(e) => setPaginas(e.target.value)} />
                  <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Editorial' value={editorial} onChange={(e) => setEditorial(e.target.value)} />
                  <input className='text-black p-2 mb-2 border rounded' type="text" placeholder='Categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                  <button onClick={updateData} className='bg-blue-500 text-black p-2 rounded'>Modificar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
