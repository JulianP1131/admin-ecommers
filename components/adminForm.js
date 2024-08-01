import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function AdminForm({
    _id,
    name: existingName,
    email: existingEmail,
}) {
    const [name, setName] = useState(existingName || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [goToAdmins, setGoToAdmins] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (goToAdmins) {
            router.push('/administrator');  // Cambia esto según la ruta que deseas
        }
    }, [goToAdmins]);

    async function saveAdmin(ev) {
        ev.preventDefault();
        const data = { name, email };

        try {
            if (_id) {
                await axios.put('/api/admins', { ...data, _id });
            } else {
                await axios.post('/api/admins', data);
            }
            Swal.fire({
                title: 'Administrador creado con exito!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setSuccess(true);
            setName('');
            setEmail('');
            setGoToAdmins(true);
            setError(null);
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'Error guardando el administrador. Intente nuevamente',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error(err);
        }
        setSuccess(false);
    }

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
