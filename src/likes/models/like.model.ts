// type Like = {
//     id: number;
//     postId: number;
//     userId: number;
//     createdAt: Date;
//     updatedAt: Date;
// }
// type CommentLike = {
//     id: number;
//     coomentId: number;
//     userId: number;
//     createdAt: Date;
//     updatedAt: Date;
// }

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class CommentLike {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  commentId: number;
}
