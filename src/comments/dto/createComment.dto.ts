import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  payload: string;

  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class CreateCommentOutput extends CoreOutput {}
