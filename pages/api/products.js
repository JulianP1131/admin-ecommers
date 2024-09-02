import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    
    try {
        await mongooseConnect(); // Establece la conexión con la base de datos
        
        switch (method) {
            case 'GET':
                try {
                    if (req.query?.id) {
                        // Recupera un solo producto por ID si se proporciona un ID en los parámetros de consulta
                        const product = await Product.findOne({ _id: req.query.id });
                        if (!product) {
                            return res.status(404).json({ error: 'Product not found' });
                        }
                        res.status(200).json(product);
                    } else {
                        // Recupera todos los productos si no se proporciona ningún ID
                        const products = await Product.find();
                        res.status(200).json(products);
                    }
                } catch (error) {
                    res.status(500).json({ error: 'Error fetching products' });
                }
                break;

            case 'POST':
                try {
                    const { title, description, price, images, category } = req.body;
                    const productDoc = await Product.create({ title, description, price, images, category });
                    res.status(201).json(productDoc);
                } catch (error) {
                    res.status(500).json({ error: 'Error creating product' });
                }
                break;

            case 'PUT':
                try {
                    // Actualiza un producto existente utilizando los datos proporcionados en el cuerpo de la solicitud
                    const { title, description, price, images, category, _id } = req.body;
                    const updatedProduct = await Product.findByIdAndUpdate(_id, { title, description, price, images, category }, { new: true });
                    if (!updatedProduct) {
                        return res.status(404).json({ error: 'Product not found' });
                    }
                    res.status(200).json(updatedProduct);
                } catch (error) {
                    res.status(500).json({ error: 'Error updating product' });
                }
                break;

            case 'DELETE':
                try { 
                    // Elimina un producto por ID proporcionado en los parámetros
                    const { id } = req.query;
                    const deletedProduct = await Product.findByIdAndDelete(id);
                    if (!deletedProduct) {
                        return res.status(404).json({ error: 'Product not found' });
                    }
                    res.status(200).json({ message: 'Product deleted successfully' });
                } catch (error) {
                    res.status(500).json({ error: 'Error deleting product' });
                }
                break;
                
            default:
                res.status(405).json({ error: 'Method not allowed' });
                break;
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
