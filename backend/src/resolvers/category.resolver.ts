import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/inputs/category.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuth } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/category.model';
import { TransactionModel } from '../models/transaction.model';
import type { UserModel } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { TransactionService } from '../services/transactions.service';

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();

  @Query(() => [CategoryModel])
  async listCategories(@GqlUser() user: UserModel): Promise<CategoryModel[]> {
    return this.categoryService.findAllByUser(user.id);
  }

  @Query(() => CategoryModel)
  async getCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<CategoryModel> {
    return this.categoryService.findById(id, user.id);
  }

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel
  ): Promise<CategoryModel> {
    return this.categoryService.create(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, data, user.id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<boolean> {
    return this.categoryService.delete(id, user.id);
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(
    @Root() category: CategoryModel
  ): Promise<TransactionModel[]> {
    return this.transactionService.findManyByCategoryId(
      category.id,
      category.userId
    );
  }
}
