import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/user.model';
import { CreatePostInput, CreatePostOutput } from './dto/createPost.dto';
import { DeletePostInput, DeletePostOutput } from './dto/deletePost.dto';
import { EditPostInput, EditPostOutput } from './dto/editPost.dto';
import {
  ReadLikeCountInput,
  ReadLikeCountOutput,
} from './dto/readLikeCount.dto';
import { ReadPostByIdInput, ReadPostByIdOutput } from './dto/readPostById.dto';
import { ReadPostsInput, ReadPostsOutput } from './dto/readPosts.dto';
import {
  ReadPostsByCategoryInput,
  ReadPostsByCategoryOutput,
} from './dto/readPostsByCategory.dto';
import { SearchPostsInput, SearchPostsOutput } from './dto/searchPosts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    createPostInput: CreatePostInput,
    user: User,
  ): Promise<CreatePostOutput> {
    try {
      const author = await this.prismaService.user.findUnique({
        where: { id: user.id },
      });
      if (!author) {
        return {
          ok: false,
          error: 'This user wrong',
        };
      }
      await this.prismaService.post.create({
        data: {
          ...createPostInput,
          userId: author.id,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editPost(
    { postId, ...editPostInput }: EditPostInput,
    user: User,
  ): Promise<EditPostOutput> {
    try {
      const existPost = await this.prismaService.post.findUnique({
        where: { id: postId },
        select: { id: true, userId: true },
      });
      if (!existPost) {
        return {
          ok: false,
          error: 'This post does not exist',
        };
      }
      if (user.id !== existPost.userId) {
        return {
          ok: false,
          error: 'No permission',
        };
      }
      await this.prismaService.post.update({
        where: { id: existPost.id },
        data: {
          ...editPostInput,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deletePost(
    { postId }: DeletePostInput,
    currentUser: User,
  ): Promise<DeletePostOutput> {
    try {
      const targetPost = await this.prismaService.post.findUnique({
        where: { id: postId },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!targetPost) {
        return {
          ok: false,
          error: 'This post does not exist',
        };
      }
      if (targetPost.userId !== currentUser.id) {
        return {
          ok: false,
          error: 'No Permission',
        };
      }
      await this.prismaService.post.delete({ where: { id: targetPost.id } });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async readPosts({ skip, take }: ReadPostsInput): Promise<ReadPostsOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });
      const postsCount = await this.prismaService.post.count();
      return {
        ok: true,
        posts,
        totalPages: Math.ceil(postsCount / take),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async readPostsByCategoryId({
    skip,
    take,
    categoryId,
  }: ReadPostsByCategoryInput): Promise<ReadPostsByCategoryOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: { categoryId },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });
      const postsCount = await this.prismaService.post.count({
        where: { categoryId },
      });
      return {
        ok: true,
        posts,
        totalPages: Math.ceil(postsCount / take),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async serachPosts({
    payload,
    skip,
    take,
  }: SearchPostsInput): Promise<SearchPostsOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: payload,
              },
            },
            {
              content: {
                contains: payload,
              },
            },
          ],
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });
      const postsCount = await this.prismaService.post.count({
        where: {
          OR: [
            {
              title: {
                contains: payload,
              },
            },
            {
              content: {
                contains: payload,
              },
            },
          ],
        },
      });
      return {
        ok: true,
        posts,
        totalPages: Math.ceil(postsCount / take),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async readLikeCount(
    { postId }: ReadLikeCountInput,
    currentUser: User,
  ): Promise<ReadLikeCountOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: 'This postId does not exist.',
          meLike: false,
        };
      }
      const likeCount = await this.prismaService.like.count({
        where: {
          postId: post.id,
        },
      });
      const meLike = await this.prismaService.like.findUnique({
        where: {
          postId_userId: {
            postId: post.id,
            userId: currentUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      return {
        ok: true,
        likeCount,
        meLike: meLike ? true : false,
      };
    } catch (error) {
      return {
        ok: false,
        error,
        meLike: false,
      };
    }
  }

  async readPostById({
    postId,
  }: ReadPostByIdInput): Promise<ReadPostByIdOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: 'This post Id dose not exist ',
        };
      }
      return {
        ok: true,
        post,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
