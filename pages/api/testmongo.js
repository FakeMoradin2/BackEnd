import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const {method, body, query} = req;
    const client  = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const alumnos = db.collection("alumnos");

    switch(method){
        case 'POST':
            const dataAlumno = {
                nombre : body.nombre,
                apellidos : body.apellidos,
                correo : body.correo,
                matricula : body.matricula,
                edad : body.edad
            }
            try{
                const answer = await alumnos.insertOne(dataAlumno);
                return res.status(200).json({message:"se añadio con exito"});
            }
            catch (error){
                return res.status(500).json({message:"Te fallo hermano"});
            }
            break;
            case 'GET':
                const result = await alumnos.find().toArray();
                return res.status(200).json(result);
            break;
    }
}