import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { CreatePostInput } from './createPost.dto';

@InputType()
export class EditPostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class EditPostOutput extends CoreOutput {}
