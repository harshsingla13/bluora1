import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    size: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // 'Star', 'Droplet', 'Database'
    color: { type: String, required: true },
    gradient: { type: String, required: true },
    border: { type: String, required: true },
    spotlight: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
