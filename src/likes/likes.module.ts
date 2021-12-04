import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [LikesService, LikesResolver],
  imports: [PrismaModule],
})
export class LikesModule {}
