import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType()
export class DeletePostInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class DeletePostOutput extends CoreOutput {}
