import mysql from 'mysql2';
import { useState } from 'react';

export default async function handler(req, res) {
    const { method, body, query} = req;
    // Configurar la conexión a la base de datos
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Saltamontes1.',
        database: 'bibliotecacurso'
    });

    switch (method) {
        case "GET":
            connection.query('SELECT * FROM categorias', function (err, results, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: err });
                } else {
                    console.log(results);
                    res.status(200).json(results);
                }
            });

            connection.end();
            break;

        case 'POST':
            console.log(body);
            connection.query(
                'INSERT INTO categorias (Nombre_Categoria, Descripcion, Fecha_Creacion, ID_Libro) VALUES (?,?,?,?)',
                [body.Nombre, body.Descripcion, body.FechaC, body.idLibro],
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        console.log(results);
                        connection.end();
                        return res.status(200).json(results);
                    }
                });
            break;

        case 'DELETE':
            console.log(query);
            connection.query(
                'DELETE FROM categorias WHERE ID_Categoria = ?',
                [query.id],
                function (err, results, fields) {
                    if(err){
                        console.log(err);
                        res.status(500).json({ error: err});
                    } else {
                        console.log(results);
                        connection.end();
                        return res.status(200).json(results);
                    }
                });
            break;

        case 'PUT':
            console.log(body);
            connection.query(
                'UPDATE categorias SET Nombre_Categoria = ?, Descripcion = ?, Fecha_Creacion = ?, ID_Libro = ? WHERE ID_Categoria = ?',
                [body.Nombre, body.Descripcion, body.FechaC, body.idLibro, body.idCategoria],
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        console.log(results);
                        connection.end();
                        return res.status(200).json(results);
                    }
                });
            break;
    }
}
