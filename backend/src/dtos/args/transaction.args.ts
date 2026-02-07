import { ArgsType, Field, GraphQLISODateTime, Int } from 'type-graphql';
import { TransactionType } from '../../generated/prisma/enums';

@ArgsType()
export class GetTransactionsArgs {
  @Field(() => Int, { defaultValue: 1 })
  pageNumber: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  limit: number = 10;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
