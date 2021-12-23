import { InputType, ObjectType } from '@nestjs/graphql';
import { ReadCommentsInput, ReadCommentsOutput } from './readComments.dto';

@InputType()
export class ReadCommentsLikeSortInput extends ReadCommentsInput {}

@ObjectType()
export class ReadCommentsLikeSortOutput extends ReadCommentsOutput {}
