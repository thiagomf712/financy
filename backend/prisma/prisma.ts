import 'dotenv/config';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../src/generated/prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});

export const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter,
  });

globalForPrisma.prisma = prismaClient;
