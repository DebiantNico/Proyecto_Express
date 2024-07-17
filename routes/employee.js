const express = require('express');
const employee = express.Router();
const db = require('../config/database')

//Publicar
employee.post("/register", async (req, res, next) => {
    const { employee_name, employee_lastname, employee_number, employee_mail, employee_password, employee_address } = req.body;
    
    if (employee_name && employee_lastname && employee_number && employee_mail && employee_password && employee_address) {
        let query = "INSERT INTO empleados (employee_name, employee_lastname, employee_number, employee_mail, employee_password, employee_address)";
        query += `VALUES ('${employee_name}', '${employee_lastname}', ${employee_number}, '${employee_mail}', '${employee_password}', '${employee_address}')`;
        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 200, message: "Empleado agregado correctamente" })
        }

        return res.status(500).json({ code:500, message: "Ocurrió un error."});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"})
});

//Eliminar
employee.delete("/delete/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE employee_id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado."})
});

//Modificar
employee.put("/put/:id([0-9]{1,3})", async (req, res, next) => {
    const { employee_name, employee_lastname, employee_number, employee_mail, employee_password, employee_address } = req.body;

    if (employee_name && employee_lastname && employee_number && employee_mail && employee_password && employee_address) {
        let query = `UPDATE empleados SET employee_password='${employee_password}',employee_name='${employee_name}', employee_lastname='${employee_lastname}', `;
        query += `employee_number=${employee_number},employee_mail='${employee_mail}',employee_address='${employee_address}' WHERE employee_id=${req.params.id}`;
        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" })
        }

        return res.status(500).json({ code:500, message: "Ocurrió un error."});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"})
});


//Obtener
employee.get("/", async (req, res, next) => {
    const empd = await db.query("SELECT * FROM empleados");
    return res.status(200).json({ code: 1, message: empd});
});

//Obtener por id
employee.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 0 && id <= 2) { 
        const empd = await db.query("SELECT * FROM empleados WHERE employee_id=" + id + ";");
        return res.status(200).json({ code: 200, message: empd });      
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" });
});

////Obtener por nombre
employee.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const empd = await db.query("SELECT * FROM empleados WHERE employee_name='" + name + ";");
    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: empd });
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" });
});

module.exports = employee