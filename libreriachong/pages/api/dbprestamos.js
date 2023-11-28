import mysql from 'mysql2';
import { useState } from 'react';

export default async function handler(req, res) {
    const { method, body, query } = req;

    // Configurar la conexión a la base de datos
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Saltamontes1.',
        database: 'bibliotecacurso'
    });

    switch (method) {
        case 'GET':
            connection.query('SELECT * FROM prestamos', function (err, results, fields) {
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
                'INSERT INTO prestamos (ID_Libro, ID_Alumno, Fecha_Prestamo, Fecha_Devolucion) VALUES (?,?,?,?)',
                [body.ID_Libro, body.ID_Alumno, body.Fecha_Prestamo, body.Fecha_Devolucion],
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        console.log(results);
                        connection.end();
                        return res.status(200).json(results);
                    }
                }
            );
            break;

        case 'DELETE':
            console.log(query);
            connection.query(
                'DELETE FROM prestamos WHERE ID_Prestamo = ?',
                [query.id],
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        console.log(results);
                        connection.end();
                        return res.status(200).json(results);
                    }
                }
            );
            break;

        case 'PUT':
            connection.query(
                'UPDATE prestamos SET ID_Libro=?, ID_Alumno=?, Fecha_Prestamo=?, Fecha_Devolucion=? WHERE ID_Prestamo = ?',
                [body.ID_Libro, body.ID_Alumno, body.Fecha_Prestamo, body.Fecha_Devolucion, query.id],
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: err });
                    } else {
                        console.log(results);
                        connection.end();
                        return res.status(200).json(results);
                    }
                }
            );
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
            res.status(405).end(`Método ${method} no permitido`);
    }
}
