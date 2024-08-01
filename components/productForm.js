// Importaciones
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Swal from "sweetalert2";

export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category:assignedCategory,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data); // Asegúrate de usar response.data aquí
            } catch (err) {
                console.error('Error fetching categories:', err);
                // Opcional: Puedes manejar el error aquí si es necesario
            }
        }

        fetchCategories();
    }, []); // Array vacío para evitar llamadas infinitas a la API

    useEffect(() => {
        if (goToProducts) {
            router.push('/products');
        }
    }, [goToProducts]);

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price, images, category: category || null };

        try {
            if (_id) {
                await axios.put('/api/products', { ...data, _id });
            } else {
                await axios.post('/api/products', data);
            }
            Swal.fire({
                title: 'Success',
                text: 'Product saved successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setSuccess(true);
            setTitle('');
            setDescription('');
            setPrice('');
            setGoToProducts(true);
            setError(null);
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'Error saving product. Please try again',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error(err);
        }
        setSuccess(false);
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            try {
                const res = await axios.post('/api/upload', data);
                setImages(oldImages => [...oldImages, ...res.data.links]);
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: 'Error uploading images. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error(err);
            }
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Nombre del producto</label>
            <input 
                type="text" 
                placeholder="Nombre del producto" 
                value={title} 
                onChange={ev => setTitle(ev.target.value)} 
            />
            <label>Categoria</label>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value="">Sin categoria</option>
                {categories.length > 0 && categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
            </select>
            <label>Imagenes</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable 
                    list={images} 
                    className="flex flex-wrap gap-1"
                    setList={updateImagesOrder}>
                    {!!images.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt="" className="rounded-lg"/>
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer border text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>Subir</div>
                    <input type="file" onChange={uploadImages} className="hidden"></input>
                </label>
            </div>
            <label>Descripción</label>
            <textarea 
                placeholder="Descripción" 
                value={description}
                onChange={ev => setDescription(ev.target.value)} 
            />
            <label>Precio</label>
            <input 
                type="text" 
                placeholder="Precio"
                value={price}
                onChange={ev => setPrice(ev.target.value)} 
            />
            <button type="submit" className="btn-primary">
                Guardar
            </button>
            {success && <p>Product saved successfully</p>}
            {error && <p>{error}</p>}
        </form>
    );
}
