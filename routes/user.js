const express = require('express');
const jwt = require('jsonwebtoken')
const user = express.Router();
const db = require('../config/database');

//Modificar
user.put('/put/:id([0-9]{1,3})',async (req, res, next) => {
    const { user_name, user_lastname, user_number, user_mail, user_password, user_address } = req.body

    if (user_name && user_lastname && user_number && user_mail && user_password && user_address) 
    {
        let query = `UPDATE user SET user_name = '${user_name}', user_lastname = '${user_lastname}', user_mail = '${user_mail}', user_address = '${user_address}', user_number = ${user_number}, user_password = '${user_password}' WHERE user_id=${req.params.id};`;
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario modificado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
    
    
});


//eliminar
user.delete('/delete/:id([0-9]{1,3})',async (req, res, next) => {
    const query = `DELETE FROM user WHERE user_id=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, messge: "Usuario borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "El usuario no existe"});
});

user.post("/signin", async (req, res, next) => {
    const { user_name, user_lastname, user_number, user_mail, user_password, user_address } = req.body;

    if ( user_name && user_lastname && user_number && user_mail && user_password && user_address) {
        let query = `INSERT INTO user (user_name, user_lastname, user_number, user_mail, user_password, user_address)`;
        query += ` VALUES ('${user_name}', '${user_lastname}', ${user_number}, '${user_mail}', '${user_password}', '${user_address}')`;
        const rows = await db.query(query);

         if (rows.affectedRows == 1) {
           return res.status(201).json({ code: 201, message: "Usuario registrado correctamente."});
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error."});
    }
    return res.status(500).json({ code: 500, message: "URL no encontrada"});
 
});

//Autenticación
user.post("/login", async (req, res, next) => {
    const {user_mail, user_password} = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if (user_mail && user_password) {
        //jwt
        if (rows.length == 1) {
            const token = jwt.sign({
               user_id: rows[0].user_id,
               user_mail: rows[0].user_mail
            }, "debugkey");
       return res.status(200).json({ code:200, message: token});  
        }
        else {
            return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos."});
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos."})
});

//Obtener
user.get("/", async ( req, res, next) => {
    const query = `SELECT * FROM user`;
    const rows = await db.query(query)

    return res.status(200).json({ code: 200, message: rows });
});

user.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const us = await db.query("SELECT * FROM user WHERE user_name='"+ name + "'");
    if (us.length > 0) {
        
        return res.status(200).json({code: 200, message: us}) 
    }
        return res.status(404).send({code: 404, message: "Usuario no encontrado"});
});

module.exports = user;