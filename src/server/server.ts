//requires
//en TS se importan las librerias y aplicaciones instaladas
import express = require('express');

//importar 'path' para resolver la ruta fisica a la carpeta 'public' 
import path = require ( 'path');

// crear una 'class' reutilizable para montar seridor expres en un puerto determinado
// para usar en otros archivos con mi codigo. La llamaremos Server.
export default class Server {
    // se usa se instala paquete npm @types/express para homologar express con TS 
public app: express.Application;
public port: number;
// definimos el contructor que sera app express en un puerto que se especifique
constructor(puerto: number){
    this.port= puerto;
    this.app = express();
}

//metodo estatico para usar cuando se quiera construir una nueva instancia 
//del contructor ej:Server.init(puerto)
static init (puerto: number){
    return new Server (puerto);
}

//metodo privado para que no sea usado fuera de esta clase
//para hacer publica la carpeta 'public'
private publicFolder(){
    //resolver ruta de la capeta public
    const publicPath = path.resolve(__dirname,'../public');
    //declararla publica
    this.app.use( express.static(publicPath) );
}

// medodo para activar el 'listen' del servidor, y que tenga un callback
start( callback:Function){
    //poner el servidor a escuchar
    this.app.listen( this.port, callback);
    //llamar funcion que publica la carpera 'public'
    this.publicFolder();

}




}
