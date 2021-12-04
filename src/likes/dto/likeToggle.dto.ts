import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType()
export class LikeToggleInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class LikeToggleOutput extends CoreOutput {}
