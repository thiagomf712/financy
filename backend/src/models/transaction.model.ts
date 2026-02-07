import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { CategoryModel } from './category.model';
import { UserModel } from './user.model';

enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'Type of the transaction (INCOME or EXPENSE)',
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => String)
  categoryId!: string;

  @Field(() => ID)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  // Relations
  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
}
