import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(user) {
  return jwt.sign(
    { sub: user._id, type: user.type },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function toPublicUser(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    type: user.type,
  }
}

export async function signin(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = signToken(user)

    return res.status(200).json({
      token,
      user: toPublicUser(user),
    })
  } catch (err) {
    console.error('Signin error:', err.message)
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}
