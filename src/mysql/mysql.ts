//======================================
// Implementacion de Class mySQL
// incluye todo para conexion y queries
//=======================================

//importar paquete npm mysql
import mysql = require('mysql');

//definimos nuestra Clase para manejar MySQL
export default class MySQL {
    //usar patron 'singleton' para evitar multiples instancias de esta clase
    //asi se evita multiples conexiones a la misma base de datos
    //ver implementacion debajo del constructor 
    private static _instance: MySQL;
    
    //definir una propiedad para la conexion mysql
    conexion: mysql.Connection;
    
    //definir propiedad para status de la conexion
    conectado: boolean = false
    
    //definir el Contructor de la clase
    constructor(){
        //crear conexion con parametros de BD y acceso
        this.conexion = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : 'nodeuser',
            database : 'node_db'
          });
        
        //llamar metodo privado para establecer la conexion
        this.conectarDB(); 
        //indicarlo en consola
        console.log('Clase MySQL inicializada');;
    }
// para asegurar que no se creen multiples instancias de la Clase 
// cada vez que se realice una conexion on la BD
public static get instance(){
    //retorna la instancia existente y si no existe retorna una nueva
    return this._instance || ( this._instance = new this());
}

//medoto para ejecutar los Queries
// recibe el query como string y tiene un callback para resultados
static ejecutarQuery( query: string, callback: Function ){
    this.instance.conexion.query(query, (err, results:Object[], fields)=>{
        if (err){
            console.log('Error en Query a Base de Datos');
            console.log(err);
            return callback(err);
        }
        //si no hubo error y se hizo el query lega aqui
        //si no se encontraron los registros
        if (results.length === 0) {
            callback('No se encontro coindiencias en la base de datos');
        } else{
        //si se encontraron enviarlos dentro del callback
        callback( null, results);
        }

    }); 
}


//implementar un metodo privado ( solo llamable desde dentro de la clase)
//para conectar a la BD y manejar error de conexion
private conectarDB(){
    this.conexion.connect((err: mysql.MysqlError )=>{
        if (err) {
            console.log('Error al conectar a Base de Datos.', err.message);
            return;
        }
        //Si no ocurre error indicar exito en conexion
        this.conectado = true;
        console.log('Base de Datos ONLINE');    
    });
}


}
