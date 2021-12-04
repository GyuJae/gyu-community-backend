import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { Post } from '../models/post.model';

@InputType()
export class ReadPostsInput {
  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}

@ObjectType()
export class ReadPostsOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;

  @Field(() => Int, { nullable: true })
  totalPages?: number | null;
}
