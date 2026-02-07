import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  iconName!: string;

  @Field(() => String)
  colorHex!: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  iconName?: string;

  @Field(() => String, { nullable: true })
  colorHex?: string;
}
