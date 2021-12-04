import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ReadPostsInput, ReadPostsOutput } from './readPosts.dto';

@InputType()
export class ReadPostsByCategoryInput extends ReadPostsInput {
  @Field(() => Int)
  categoryId: number;
}

@ObjectType()
export class ReadPostsByCategoryOutput extends ReadPostsOutput {}
