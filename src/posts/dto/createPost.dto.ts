import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String], { nullable: true })
  file?: string[] | null;

  @Field(() => Int)
  categoryId: number;
}

@ObjectType()
export class CreatePostOutput extends CoreOutput {}
