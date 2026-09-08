import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    desc: { type: String, trim: true },
    price: { type: Number, required: true },
    condition: { type: String, trim: true },
    modelUrl: { type: String, trim: true },
    modelimg: { type: String, trim: true },
  },
  { collection: 'products' }
)

export default mongoose.model('Product', productSchema)
