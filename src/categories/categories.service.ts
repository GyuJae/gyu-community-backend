import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadCategoriesOutput } from './dto/readCategories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async readCategories(): Promise<ReadCategoriesOutput> {
    try {
      const categories = await this.prisma.category.findMany();
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
