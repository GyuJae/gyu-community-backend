import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { CreateUserInput } from './createUser.dto';

@InputType('editUserInput', { isAbstract: true })
export class EditUserInput extends PickType(CreateUserInput, ['name']) {}

@ObjectType()
export class EditUserOutput extends CoreOutput {}
