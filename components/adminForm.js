// Importaciones
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function AdminForm({
    _id,
    name: existingName,
    email: existingEmail,
}) {
    // Se define el estado local para el nombre, correo electronico, errores, exito y el estado de navegacion
    const [name, setName] = useState(existingName || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [goToAdmins, setGoToAdmins] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Efecto secundario que se ejecutta cuando goToAdmins cambia, redirigiendo a '/administrador'
        if (goToAdmins) {
            router.push('/administrator');   // Dependencia en goToAdmins
        }
    }, [goToAdmins, router]); // Añadir 'router' a la lista de dependencias

    async function saveAdmin(ev) {
        // Funcion que maneja el envio del formulario para guardar o actualizar un administrador
        ev.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de pagina)
        const data = { name, email }; // Crea un objeto con los datos del administrador

        try {
            // Si se proporciona _id, actualiza el administrador existente; de lo contrario, crea uno nuevo
            if (_id) { 
                await axios.put('/api/admins', { ...data, _id }); // Solicitud PUT para actualizar el administrador
            } else {
                await axios.post('/api/admins', data); // Solicitud POST para crear un nuevo administrador
            }
            // Muestra una alerta de exito si la operacion se realizo correctamente
            Swal.fire({
                title: 'Administrador creado con exito!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setSuccess(true); // Actualiza el estado de exito
            setName(''); // Resetea el campo de nombre
            setEmail(''); // Resetea el campo de email
            setGoToAdmins(true); // Indica que se debe redirigir a la lista de administradores
            setError(null); // Resetea el estado de error
        } catch (err) {
            // Muestra un mensaje de error si ocurre un problema al guardar
            Swal.fire({
                title: 'Error',
                text: 'Error guardando el administrador. Intente nuevamente',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error(err); // Registra el error en la consola
        }
        setSuccess(false); // Resetea el estado de exito
    }
 
    // Retorna el JSX del formulario con campos y un boton de envio
    return (
        <form onSubmit={saveAdmin}>
            <label>Nombre del administrador</label>
            <input 
                type="text" 
                placeholder="Admin Name" 
                value={name} 
                onChange={ev => setName(ev.target.value)} 
            />
            <label>Email del administrador (gmail)</label>
            <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={ev => setEmail(ev.target.value)} 
            />
            <button type="submit" className="btn-primary">
                Save
            </button>
            {success && <p>Administrator saved successfully</p>}
            {error && <p>{error}</p>}
        </form>
    );
}
