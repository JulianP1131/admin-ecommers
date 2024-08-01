import mongoose, {Schema, model, models} from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null}
});

export const Category = models?.Category || model('Category', CategorySchema);