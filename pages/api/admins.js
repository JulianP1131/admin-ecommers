import { mongooseConnect } from '@/lib/mongoose';
import Admin from '@/models/Admin';

export default async function handler(req, res) {
    await mongooseConnect();

    switch (req.method) {
        case 'GET':
            try {
                const admins = await Admin.find({});
                res.status(200).json(admins);
            } catch (error) {
                console.error('Error fetching admins:', error);
                res.status(500).json({ error: 'Error fetching data' });
            }
            break;
            
        case 'POST':
            try {
                const newAdmin = req.body;
                const admin = new Admin(newAdmin);
                await admin.save();
                res.status(201).json(admin);
            } catch (error) {
                console.error('Error saving admin:', error);
                res.status(500).json({ error: 'Error saving data' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
