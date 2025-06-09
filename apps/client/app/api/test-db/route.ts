import { NextResponse } from 'next/server';
import  prisma  from '../../../lib/prisma/client';

export async function GET() {
  try {
    // Just run a test query like fetching all users
    const users = await prisma.user.findMany();
    return NextResponse.json({ message: 'DB connected ✅', users });
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    return NextResponse.json({ error: 'DB connection failed' }, { status: 500 });
  }
}
