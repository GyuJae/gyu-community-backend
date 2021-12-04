import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';

@InputType('createUserInput', { isAbstract: true })
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
