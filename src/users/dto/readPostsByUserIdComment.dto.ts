import { InputType, ObjectType } from '@nestjs/graphql';
import {
  ReadPostsByUserIdInput,
  ReadPostsByUserIdOutput,
} from './readPostsByUserID.dto';

@InputType()
export class ReadPostsByUserIdCommentInput extends ReadPostsByUserIdInput {}

@ObjectType()
export class ReadPostsByUserIdCommentOutput extends ReadPostsByUserIdOutput {}
