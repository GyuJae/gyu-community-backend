import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { CreateUserInput } from './createUser.dto';

@InputType('loginInput', { isAbstract: true })
export class LoginInput extends CreateUserInput {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string | null;
}
