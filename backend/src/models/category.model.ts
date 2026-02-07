import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import { TransactionModel } from './transaction.model';
import { UserModel } from './user.model';

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  iconName!: string;

  @Field(() => String)
  colorHex!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => UserModel)
  user!: UserModel;

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[];
}
