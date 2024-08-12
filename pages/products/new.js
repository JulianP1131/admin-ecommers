import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";

export default function NewProduct() {
    return (
        <Layout>
            <h1 className="text-rojoM">Nuevo producto</h1>
            <ProductForm />
        </Layout>
    );
}