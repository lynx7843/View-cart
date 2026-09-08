import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

// In production, restrict CORS to the deployed frontend via CLIENT_URL.
// Left unset, it stays open (useful for local dev / previews).
app.use(cors(process.env.CLIENT_URL ? { origin: process.env.CLIENT_URL } : {}))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err.message)
    process.exit(1)
  }
}

start()
