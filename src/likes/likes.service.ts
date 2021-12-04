import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/user.model';
import {
  LikeCommentToggleInput,
  LikeCommentToggleOutput,
} from './dto/likeCommentToggle.dto';
import { LikeToggleInput, LikeToggleOutput } from './dto/likeToggle.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prismaService: PrismaService) {}

  async likeToggle(
    { postId }: LikeToggleInput,
    currentUser: User,
  ): Promise<LikeToggleOutput> {
    try {
      const targetPost = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
        },
      });
      if (!targetPost) {
        return {
          ok: false,
          error: 'This is post does not have',
        };
      }
      const currentLike = await this.prismaService.like.findUnique({
        where: {
          postId_userId: {
            userId: currentUser.id,
            postId: targetPost.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (currentLike) {
        await this.prismaService.like.delete({
          where: {
            postId_userId: {
              userId: currentUser.id,
              postId: targetPost.id,
            },
          },
        });
      } else {
        await this.prismaService.like.create({
          data: {
            user: {
              connect: {
                id: currentUser.id,
              },
            },
            post: {
              connect: {
                id: targetPost.id,
              },
            },
          },
        });
      }
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

  async likeCommentToggle(
    { commentId }: LikeCommentToggleInput,
    currentUser: User,
  ): Promise<LikeCommentToggleOutput> {
    try {
      const targetComment = await this.prismaService.comment.findUnique({
        where: {
          id: commentId,
        },
        select: { id: true },
      });
      if (!targetComment) {
        return {
          ok: false,
          error: 'This comment does not exist',
        };
      }
      const currentLike = await this.prismaService.commentLike.findUnique({
        where: {
          commentId_userId: {
            commentId: targetComment.id,
            userId: currentUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (currentLike) {
        await this.prismaService.commentLike.delete({
          where: {
            commentId_userId: {
              commentId: targetComment.id,
              userId: currentUser.id,
            },
          },
        });
      } else {
        await this.prismaService.commentLike.create({
          data: {
            user: {
              connect: {
                id: currentUser.id,
              },
            },
            comment: {
              connect: {
                id: targetComment.id,
              },
            },
          },
        });
      }
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
}
