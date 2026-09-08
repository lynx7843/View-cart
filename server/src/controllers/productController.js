import Product from '../models/Product.js'

export async function getProducts(req, res) {
  try {
    const products = await Product.find({}).sort({ _id: 1 })
    return res.status(200).json(products)
  } catch (err) {
    console.error('Get products error:', err.message)
    return res.status(500).json({ message: 'Unable to load products.' })
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    return res.status(200).json(product)
  } catch (err) {
    console.error('Get product error:', err.message)
    return res.status(500).json({ message: 'Unable to load product.' })
  }
}
