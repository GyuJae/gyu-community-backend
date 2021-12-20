import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/user.model';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dto/createComment.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from './dto/deleteComment.dto';
import { ReadCommentsInput, ReadCommentsOutput } from './dto/readComments.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(
    { payload, postId }: CreateCommentInput,
    author: User,
  ): Promise<CreateCommentOutput> {
    try {
      const targetPost = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: { id: true },
      });
      if (!targetPost) {
        return {
          ok: false,
          error: "This post don't exist",
        };
      }
      await this.prismaService.comment.create({
        data: {
          payload,
          postId: targetPost.id,
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

  async deleteComment(
    { commentId }: DeleteCommentInput,
    currentUser: User,
  ): Promise<DeleteCommentOutput> {
    try {
      const targetComment = await this.prismaService.comment.findUnique({
        where: {
          id: commentId,
        },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!targetComment) {
        return {
          ok: false,
          error: 'This comment does not exists',
        };
      }
      if (targetComment.userId !== currentUser.id) {
        return {
          ok: false,
          error: 'No Permission',
        };
      }
      await this.prismaService.comment.delete({
        where: {
          id: targetComment.id,
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

  async readComments({
    postId,
    skip,
    take,
  }: ReadCommentsInput): Promise<ReadCommentsOutput> {
    try {
      const targetPost = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: { id: true },
      });
      if (!targetPost) {
        return {
          ok: false,
          error: 'This postId does not exist',
        };
      }
      const comments = await this.prismaService.comment.findMany({
        where: {
          postId: targetPost.id,
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });
      const commentCount = await this.prismaService.comment.count({
        where: {
          postId: targetPost.id,
        },
      });
      return {
        ok: true,
        comments,
        totalPage: Math.ceil(commentCount / take),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
