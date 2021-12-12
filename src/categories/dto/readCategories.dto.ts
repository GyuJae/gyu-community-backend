import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dto/coreOutput.dto';
import { Category } from '../models/category.model';

@InputType()
export class ReadCategoriesInput {}

@ObjectType()
export class ReadCategoriesOutput extends CoreOutput {
  @Field(() => [Category], { nullable: true })
  categories?: Category[] | null;
}
