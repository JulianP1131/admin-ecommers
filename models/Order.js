import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const LineItemSchema = new Schema({
    product_id: String,
    quantity: Number,
    price: Number
});

const OrderSchema = new Schema({
    line_items: [LineItemSchema],
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    streetAddress: { type: String, required: true },
    paid: { type: Boolean, default: false },
    ref_payco: String,
}, {
    timestamps: true,
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
