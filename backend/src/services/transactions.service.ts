import { prismaClient } from '../../prisma/prisma';
import type { TransactionModel } from '../models/transaction.model';

export class TransactionService {
  async findManyByCategoryId(
    categoryId: string,
    userId: string
  ): Promise<TransactionModel[]> {
    return prismaClient.transaction.findMany({
      where: { categoryId, userId },
    }) as unknown as TransactionModel[];
  }
}
