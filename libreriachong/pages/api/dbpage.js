import mysql from 'mysql2';
import { useState } from 'react';

export default async function handler(req, res) {
    const { method, body, query } = req;

    const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'bibliotecacurso',
    });

    switch (method) {
    case 'GET':
        connection.query('SELECT * FROM alumnos', function (err, results, fields) {
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
        connection.query(
        'INSERT INTO alumnos (nombre, apellidos, correo, matricula, edad) VALUES (?,?,?,?,?)',
        [body.nombre, body.apellidos, body.correo, body.matricula, body.edad],
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
      // Manejar la solicitud DELETE para eliminar datos
        connection.query(
        'DELETE FROM alumnos WHERE PKid = ?',
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
        });
        break;

    case 'PUT':
        connection.query(
        'UPDATE alumnos SET nombre=?, apellidos=?, correo=?, matricula=?, edad=? WHERE PKid = ?',
        [body.nombre, body.apellidos, body.correo, body.matricula, body.edad, query.id],
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
