import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/user.model';
import { CurrentUser } from 'src/users/users.decorator';
import { AuthGuard } from 'src/users/users.guard';
import { CreatePostInput, CreatePostOutput } from './dto/createPost.dto';
import { DeletePostInput, DeletePostOutput } from './dto/deletePost.dto';
import { EditPostInput, EditPostOutput } from './dto/editPost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dto/readPosts.dto';
import {
  ReadPostsByCategoryInput,
  ReadPostsByCategoryOutput,
} from './dto/readPostsByCategory.dto';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postService: PostsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Query(() => ReadPostsOutput)
  async readPosts(
    @Args('input') readPostInput: ReadPostsInput,
  ): Promise<ReadPostsOutput> {
    return this.postService.readPosts(readPostInput);
  }

  @Query(() => ReadPostsByCategoryOutput)
  async readPostsByCategory(
    @Args('input') readPostsByCategoryInput: ReadPostsByCategoryInput,
  ): Promise<ReadPostsByCategoryOutput> {
    return this.postService.readPostsByCategoryId(readPostsByCategoryInput);
  }

  @Mutation(() => CreatePostOutput)
  @UseGuards(AuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput, user);
  }

  @Mutation(() => EditPostOutput)
  @UseGuards(AuthGuard)
  async editPost(
    @Args('input') editPostInput: EditPostInput,
    @CurrentUser() user: User,
  ): Promise<EditPostOutput> {
    return this.postService.editPost(editPostInput, user);
  }

  @Mutation(() => DeletePostOutput)
  @UseGuards(AuthGuard)
  async deletePost(
    @Args('input') deletePostInput: DeletePostInput,
    @CurrentUser() currentUser: User,
  ): Promise<DeletePostOutput> {
    return this.postService.deletePost(deletePostInput, currentUser);
  }

  @ResolveField(() => Int)
  async likeCount(@Parent() { id }: Post): Promise<number> {
    const count = await this.prismaService.like.count({
      where: {
        postId: id,
      },
    });
    return count;
  }

  @ResolveField(() => Boolean)
  async isMine(
    @Parent() { userId }: Post,
    @CurrentUser() currentUser: User,
  ): Promise<boolean> {
    return userId === currentUser.id;
  }
}
