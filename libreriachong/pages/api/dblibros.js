import mysql from 'mysql2';
import { useState } from 'react';

export default async function handler(req, res){
    const {method, body} = req;
    //configurar la conexion base de datos
    const connection = mysql.createConnection({
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'Saltamontes1.',
        database : 'bibliotecacurso'
    });
    switch(method){
        case "GET":

    connection.query('SELECT * FROM libros', function(err, results, fields){
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

    case 'POST':
        console.log(body);
        connection.query('INSERT INTO libros (titulo, autor, paginas, editorial, categoria) VALUES (?,?,?,?,?)',
        [body.titulo, body.autor, body.paginas, body.editorial, body.categoria],
        function(err, results, fields){
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