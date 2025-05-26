import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Example: Create a user
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Shyam',
      email: 'shyam@example.com',
      password: 'hashed-password',
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
