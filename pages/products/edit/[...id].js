// Importaciones
import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    // Efecto que se ejecuta cuando cambia el id
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(response => { 
            setProductInfo(response.data);
        });
    }, [id]); // Agrega id como dependencia del useEffect

    // Renderizado del componente
    return (
        <Layout>
            <h1>Editar producto</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    );
}
