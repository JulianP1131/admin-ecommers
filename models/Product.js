import mongoose, {model, Schema, models} from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: {type:mongoose.Types.ObjectId, ref: 'Category'}
}, {
    timestamps: true,
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
