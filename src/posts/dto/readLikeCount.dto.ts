import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType()
export class ReadLikeCountInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class ReadLikeCountOutput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  likeCount?: number | null;

  @Field(() => Boolean)
  meLike: boolean;
}
