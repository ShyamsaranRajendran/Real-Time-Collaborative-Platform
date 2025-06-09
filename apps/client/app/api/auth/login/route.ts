import prisma from '@/lib/prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
  }

  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Missing email or password' }), { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.hashedPassword) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  }

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword)
  if (!passwordMatch) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })

  const resBody = {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    },
  }

  return new Response(JSON.stringify(resBody), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
