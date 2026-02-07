import { Field, Int, ObjectType } from 'type-graphql';
import { TransactionModel } from '../../models/transaction.model';

@ObjectType()
export class PaginatedTransactions {
  @Field(() => [TransactionModel])
  items!: TransactionModel[];

  @Field(() => Int)
  total!: number;
}
