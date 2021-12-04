import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { Comment } from '../model/comment.model';

@InputType()
export class ReadCommentsInput {
  @Field(() => Int)
  postId: number;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}

@ObjectType()
export class ReadCommentsOutput extends CoreOutput {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[] | null;

  @Field(() => Int, { nullable: true })
  totalPage?: number | null;
}
