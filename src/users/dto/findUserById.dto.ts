import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { User } from '../models/user.model';

@InputType()
export class FindUserByIdInput {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class FindUserByIdOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User | null;
}
