import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType()
export class DeleteCommentInput {
  @Field(() => Int)
  commentId: number;
}

@ObjectType()
export class DeleteCommentOutput extends CoreOutput {}
