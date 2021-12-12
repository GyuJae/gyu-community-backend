import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './users/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/auth.contants';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
    }),
    UsersModule,
    PrismaModule,
    CoreModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    PostsModule,
    CommentsModule,
    LikesModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
