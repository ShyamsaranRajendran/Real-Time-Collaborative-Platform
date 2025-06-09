import { Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    role: Role
  }
  
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}