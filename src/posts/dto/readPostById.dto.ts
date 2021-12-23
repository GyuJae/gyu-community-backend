import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { Post } from '../models/post.model';

@InputType()
export class ReadPostByIdInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class ReadPostByIdOutput extends CoreOutput {
  @Field(() => Post, { nullable: true })
  post?: Post | null;
}
