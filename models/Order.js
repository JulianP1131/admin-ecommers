import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    phone: String,
    city: String,
    StreetAddress: String,
    paid: Boolean,
    ref_payco: String,
}, {
    timestamps: true,
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
