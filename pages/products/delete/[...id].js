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
        axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data);
        }).catch(error => {
            console.error('Error fetching product:', error);
        });
    }, [id]);

    function goBack() {
        router.push('/products');
    }

    async function deleteProduct() {
        try {
            await axios.delete('/api/products?id=' + id);
            goBack();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <Layout>
            <h1 className="text-center">
                Realmente quieres eliminar &nbsp;&quot;{productInfo?.title}&quot;?
            </h1>
            <div className="flex gap-2 justify-center">
                <button
                    onClick={deleteProduct}
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
