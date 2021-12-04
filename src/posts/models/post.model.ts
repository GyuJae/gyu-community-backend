import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => [String])
  file: string[];

  @Field(() => Int, { nullable: true })
  userId: number | null;

  @Field(() => Int)
  categoryId: number;
}
