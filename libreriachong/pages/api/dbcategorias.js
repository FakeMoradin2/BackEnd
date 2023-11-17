import mysql from 'mysql2';

export default async function handler(req, res){
    const {method, body} = req;
    switch(method){
        case "GET":
            //configurar la conexion base de datos
    const connection = mysql.createConnection({
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'Saltamontes1.',
        database : 'bibliotecacurso'
    });

    connection.query('SELECT * FROM categorias', function(err, results, fields){
        if(err){
            console.log(err);
            res.status(500).json({error: err});
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });

    connection.end();
    break;
    }
}