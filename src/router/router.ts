//importar funcionalidad de express para rutas
import {Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

//Crear nueva instancia de un Router
const router = Router();

//definir rutas del nuestros servicios en 'router'
router.get('/heroes', (req: Request, res: Response)=>{
    //crear string con texto de la consulta a la BD
    const query =`
            SELECT *
            FROM heroes`;
    //llamar a mi funcion que ejecuta la consulta
    MySQL.ejecutarQuery(query, (err:any, resultados: Object[])=>{
        //si hay error indicarlo
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
            //sino resolver con resultados
        } else {
            res.status(200).json({
                ok: true,
                heroes: resultados
            });
        }
    });
});

router.get('/heroes/:id', (req: Request, res: Response)=>{
    const id =req.params.id;
    //escapar el ID para evitar inyecciones en el parametro
    //usamos una funcion integrada enel paquete mysql
    const escapedId = MySQL.instance.conexion.escape(id);


    //crear string con texto de la consulta a la BD
    const query =`
            SELECT *
            FROM heroes
            WHERE id=${escapedId}`;
    //llamar a mi funcion que ejecuta la consulta
    MySQL.ejecutarQuery(query, (err:any, resultados: Object[])=>{
        //si hay error indicarlo
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
            //sino resolver con resultados
        } else {
            res.status(200).json({
                ok: true,
                heroe: resultados[0]
            });
        }
    });
});

export default router;