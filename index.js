import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//Calculadora

//Endpoint para sumar
app.get('/sumar', (req, res) => {
    const body = req.body;
    //Validar que los numeros existan
    if (!body.num1 || !body.num2) {
        return res.status(400).json({
            msg: "Numero invalidos"
        })
    }

    const result = parseInt(body.num1) + parseInt(body.num2);

    return res.status(200).json({
        result
    });
})

//Endpoint para restar
app.get('/resta', (req, res) => {
    const body = req.body;
    //Validar que los numeros existan
    if (!body.num1 || !body.num2) {
        return res.status(400).json({
            msg: "Numero invalidos"
        })
    }

    const result = parseInt(body.num1) - parseInt(body.num2);

    return res.status(200).json({
        result
    });
})

//Endpoint para dividir
app.get('/dividir', (req, res) => {
    const body = req.body;
    //Validar que los numeros existan
    if (!body.num1 || !body.num2) {
        return res.status(400).json({
            msg: "Numero invalidos"
        })
    }

    const result = parseInt(body.num1) / parseInt(body.num2);

    return res.status(200).json({
        result
    });
})

//Endpoint para multiplicar
app.get('/multiplicar', (req, res) => {
    const body = req.body;
    //Validar que los numeros existan
    if (!body.num1 || !body.num2) {
        return res.status(400).json({
            msg: "Numero invalidos"
        })
    }

    const result = parseInt(body.num1) * parseInt(body.num2);

    return res.status(200).json({
        result
    });
})

app.listen(4000,()=>console.log("Aplicacion corriendo!"))