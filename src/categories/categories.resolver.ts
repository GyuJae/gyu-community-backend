import { Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { ReadCategoriesOutput } from './dto/readCategories.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query(() => ReadCategoriesOutput)
  readCategories(): Promise<ReadCategoriesOutput> {
    return this.categoryService.readCategories();
  }
}
