import { InputType, ObjectType } from '@nestjs/graphql';
import {
  ReadPostsByUserIdInput,
  ReadPostsByUserIdOutput,
} from './readPostsByUserID.dto';

@InputType()
export class ReadPostsByUserIdLikeInput extends ReadPostsByUserIdInput {}

@ObjectType()
export class ReadPostsByUserIdLikeOutput extends ReadPostsByUserIdOutput {}
