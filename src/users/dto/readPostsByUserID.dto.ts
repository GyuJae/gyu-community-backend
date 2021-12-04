import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { Post } from 'src/posts/models/post.model';

@InputType()
export class ReadPostsByUserIdInput {
  @Field(() => Int)
  userId: number;
}

@ObjectType()
export class ReadPostsByUserIdOutput extends CoreOutput {
  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;
}
