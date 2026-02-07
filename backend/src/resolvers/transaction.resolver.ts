import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { GetTransactionsArgs } from '../dtos/args/transaction.args';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/inputs/transaction.input';
import { PaginatedTransactions } from '../dtos/outputs/transaction.output';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuth } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/category.model';
import { TransactionModel } from '../models/transaction.model';
import type { UserModel } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { TransactionService } from '../services/transactions.service';

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();
  private categoryService = new CategoryService();

  @Query(() => PaginatedTransactions)
  async listTransactions(
    @Args(() => GetTransactionsArgs) args: GetTransactionsArgs,
    @GqlUser() user: UserModel
  ): Promise<PaginatedTransactions> {
    return this.transactionService.findManyPaginated(args, user.id);
  }

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.getById(id, user.id);
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.create(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.update(id, data, user.id);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<boolean> {
    return this.transactionService.delete(id, user.id);
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel
  ): Promise<CategoryModel> {
    return this.categoryService.getById(
      transaction.categoryId,
      transaction.userId
    );
  }
}
