import { auth } from '../auth'
import type { Role } from '../types/index'
import prisma from '../../lib/prisma/client'

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

// Define role hierarchy manually
const RoleHierarchy: Record<Role, number> = {
  viewer: 1,
  editor: 2,
  owner: 3,
}

export async function checkDocumentAccess(documentId: string, requiredRole: Role) {
  const user = await getCurrentUser()
  if (!user) return false

  // Get the user permission for this document
  const permission = await prisma.documentPermission.findFirst({
    where: {
      userId: user.id,
      documentId,
    }
  })

  // Check if permission meets the required role
  if (
    permission &&
    RoleHierarchy[permission.permission as Role] >= RoleHierarchy[requiredRole]
  ) {
    return true
  }

  // If user is the owner of the document
  const isOwner = await prisma.document.findFirst({
    where: {
      id: documentId,
      ownerId: user.id,
    }
  })

  return !!isOwner
}
export async function getUserRole(documentId: string) {
  const user = await getCurrentUser()
  if (!user) return null

  // Get the user permission for this document
  const permission = await prisma.documentPermission.findFirst({
    where: {
      userId: user.id,
      documentId,
    }
  })

  return permission ? permission.permission : null
}