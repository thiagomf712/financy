import { prismaClient } from '../../prisma/prisma';
import type { GetTransactionsArgs } from '../dtos/args/transaction.args';
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/inputs/transaction.input';
import type { Prisma } from '../generated/prisma/client';
import type { TransactionModel } from '../models/transaction.model';

export type PaginatedTransactions = {
  items: TransactionModel[];
  total: number;
};

export type SummarizedTransactions = {
  totalIncome: number;
  totalExpense: number;
};

export class TransactionService {
  async getSummary(userId: string): Promise<SummarizedTransactions> {
    const result = await prismaClient.transaction.groupBy({
      by: ['type'],
      where: { userId },
      _sum: { amount: true },
    });

    const summary: SummarizedTransactions = {
      totalIncome: 0,
      totalExpense: 0,
    };

    result.forEach(group => {
      if (group.type === 'INCOME') {
        summary.totalIncome = group._sum.amount ?? 0;
      } else if (group.type === 'EXPENSE') {
        summary.totalExpense = group._sum.amount ?? 0;
      }
    });

    return summary;
  }

  async findManyPaginated(
    query: GetTransactionsArgs,
    userId: string
  ): Promise<PaginatedTransactions> {
    const where: Prisma.TransactionWhereInput = {
      userId,
      ...(query.search ? { description: { contains: query.search } } : {}),
      ...(query.categoryId && { categoryId: query.categoryId }),
      ...(query.type && { type: query.type }),
      ...(query.startDate || query.endDate
        ? {
            date: {
              ...(query.startDate && { gte: query.startDate }),
              ...(query.endDate && { lte: query.endDate }),
            },
          }
        : {}),
    };

    const [items, total] = await prismaClient.$transaction([
      prismaClient.transaction.findMany({
        where,
        skip: (query.pageNumber - 1) * query.limit,
        take: query.limit,
        orderBy: { date: 'desc' },
      }),
      prismaClient.transaction.count({ where }),
    ]);

    return { items, total };
  }

  async getById(id: string, userId: string): Promise<TransactionModel> {
    const transaction: TransactionModel | null =
      await prismaClient.transaction.findFirst({
        where: { id, userId },
      });

    if (!transaction) {
      throw new Error('Transação não encontrada');
    }

    return transaction;
  }

  async create(
    data: CreateTransactionInput,
    userId: string
  ): Promise<TransactionModel> {
    var category = await prismaClient.category.findFirst({
      where: { id: data.categoryId, userId },
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return prismaClient.transaction.create({
      data: {
        amount: data.amount,
        categoryId: data.categoryId,
        date: data.date,
        description: data.description,
        type: data.type,
        userId,
      },
    });
  }

  async update(
    id: string,
    data: UpdateTransactionInput,
    userId: string
  ): Promise<TransactionModel> {
    var transaction = await prismaClient.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada');
    }

    return await prismaClient.transaction.update({
      where: { id },
      data: {
        amount: data.amount ?? transaction.amount,
        categoryId: data.categoryId ?? transaction.categoryId,
        date: data.date ?? transaction.date,
        description: data.description ?? transaction.description,
        type: data.type ?? transaction.type,
      },
    });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    var transaction = await prismaClient.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada');
    }

    await prismaClient.transaction.delete({
      where: { id },
    });

    return true;
  }

  async findManyByCategoryId(
    categoryId: string,
    userId: string
  ): Promise<TransactionModel[]> {
    return prismaClient.transaction.findMany({
      where: { categoryId, userId },
    });
  }
}
