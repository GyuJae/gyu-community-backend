import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { Post } from 'src/posts/models/post.model';

@InputType()
export class ReadPostsByUserIdLikeInput {
  @Field(() => Int)
  userId: number;
}

@ObjectType()
export class ReadPostsByUserIdLikeOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;
}
