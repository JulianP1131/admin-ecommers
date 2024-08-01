// pages/api/admins/[id].js
import { mongooseConnect } from '@/lib/mongoose';
import Admin from '@/models/Admin';

export default async function handler(req, res) {
    const { method, query: { id } } = req;

    await mongooseConnect();

    switch (method) {
        case 'DELETE':
            try {
                const result = await Admin.findByIdAndDelete(id);
                if (!result) {
                    return res.status(404).json({ error: 'Administrador no encontrado' });
                }
                res.status(200).json({ message: 'Administrador eliminado correctamente' });
            } catch (error) {
                console.error('Error eliminando administrador:', error);
                res.status(500).json({ error: 'Error eliminando administrador' });
            }
            break;
        default:
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Método ${method} no permitido`);
    }
}
