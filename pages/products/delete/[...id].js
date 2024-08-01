// Importaciones
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(response => { // Realiza una solicitud GET a la API para obtener la informacion del producto
            setProductInfo(response.data);  // Actualiza el estado con los datos del rpoducto recibidos por la API
        }).catch(error => {
            console.error('Error fetching product:', error);
        });
    }, [id]); // El array de dependencias contiene solo 'id'
    

    // Refirije al usuario a la pagina de productos cuando se cancela la eliminacion del producto
    function goBack() {
        router.push('/products');
    }

    // Realiza una solicitud DELETE a la API para eliminar el producto con el ID espificado y redirige al usuario a la pagina de productos despues de la eliminacion
    async function deleteProduct() {
        try {
            await axios.delete('/api/products?id=' + id);
            goBack();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    // Renderizado del componente
    return (
        <Layout>
            <h1 className="text-center">Realmente quieres eliminar
                &nbsp;"{productInfo?.title}"?
            </h1>
            <div className="flex gap-2 justify-center">
                <button 
                    onClick={deleteProduct}  // Aquí usamos la referencia a la función sin ejecutarla inmediatamente
                    className="btn-red">
                    Si, eliminar
                </button>
                <button 
                    className="btn-default" 
                    onClick={goBack}>
                    No, cancelar
                </button>
            </div>
        </Layout>
    );
}
