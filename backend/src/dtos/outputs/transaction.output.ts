import { Field, Float, Int, ObjectType } from 'type-graphql';
import { TransactionModel } from '../../models/transaction.model';

@ObjectType()
export class PaginatedTransactions {
  @Field(() => [TransactionModel])
  items!: TransactionModel[];

  @Field(() => Int)
  total!: number;
}

@ObjectType()
export class SummaryTransactions {
  @Field(() => Float)
  totalIncome!: number;

  @Field(() => Float)
  totalExpense!: number;
}
