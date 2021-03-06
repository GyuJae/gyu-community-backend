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

  @Field(() => String)
  content: string;

  @Field(() => [String], { nullable: true })
  file?: string[] | null;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  categoryId: number;
}
