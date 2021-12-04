import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType()
export class LikeCommentToggleInput {
  @Field(() => Int)
  commentId: number;
}

@ObjectType()
export class LikeCommentToggleOutput extends CoreOutput {}
