//importar nuestra clase 'Server'
import Server from './server/server';
//importar nuestra libreria 'Router'
import router from './router/router';
import MySQL from './mysql/mysql';

//crear instancia de nuestra clase Server en puerto 3000 
//llamando al contructor de la clase con .init(3000)
const server =Server.init(3000);
//inssertar nuestras rutas
server.app.use(router);

//crear instancia de nuestra Clase mySQL
//normalmente se haria: const mysql = new MySQL();
//pero para evitar se creen multiples lo hacemos llamando el metodo creado para eso
MySQL.instance;

server.start( ()=>{
    console.log('Servidor corriendo en puerto', server.port); 
});





