// Importaciones
import mongoose from 'mongoose';

// Configuracion de Mongoose para usar 'strictQuery'
mongoose.set('strictQuery', true)

/* 
    Conecta a la base de datos MongoDB usando Mongoose.
    Si la conexion ya esta establecida, no hace nada.
*/
export async function mongooseConnect() {
    // Comprueba si hay una conexion ectiva
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    // Conecta a la base de datos MongoDB ysando la URI de la conexion de entorno
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,  // Utiliza el nuevo analizador del URL 
        useUnifiedTopology: true,   // Usa la nueva capa de gestion de conexiones
    });
}
