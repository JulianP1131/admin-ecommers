import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    try {
      const categories = await Category.find().populate('parent');
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  if (method === 'POST') {
    const { name, parentCategory } = req.body;
    try {
      const categoryData = { name };

      if (parentCategory && parentCategory !== "") {
        categoryData.parent = parentCategory;
      } else {
        categoryData.parent = null;
      }

      const categoryDoc = await Category.create(categoryData);
      res.json(categoryDoc);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (method === 'PUT') {
    const { name, parentCategory, _id } = req.body;
    try {
      const categoryData = { name };

      if (parentCategory && parentCategory !== "") {
        categoryData.parent = parentCategory;
      } else {
        categoryData.parent = null;
      }

      const categoryDoc = await Category.updateOne({ _id }, categoryData);
      res.json(categoryDoc);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    try {
      await Category.deleteOne({ _id });
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
