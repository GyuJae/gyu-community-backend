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
import { CommentsService } from './comments.service';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dto/createComment.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from './dto/deleteComment.dto';
import { ReadCommentsInput, ReadCommentsOutput } from './dto/readComments.dto';
import {
  ReadCommentsLikeSortInput,
  ReadCommentsLikeSortOutput,
} from './dto/readCommentsLikeSort.dto';
import { Comment } from './model/comment.model';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentService: CommentsService,
    private readonly prismaService: PrismaService,
  ) {}

  @ResolveField(() => Boolean)
  async meLike(
    @Parent() comment: Comment,
    @CurrentUser() currentUser: User,
  ): Promise<boolean> {
    try {
      if (!currentUser) {
        return false;
      }

      const like = await this.prismaService.commentLike.findUnique({
        where: {
          commentId_userId: {
            userId: currentUser.id,
            commentId: comment.id,
          },
        },
        select: {
          id: true,
        },
      });
      return like ? true : false;
    } catch {
      return false;
    }
  }

  @ResolveField(() => Boolean)
  async isMine(
    @Parent() comment: Comment,
    @CurrentUser() currentUser: User,
  ): Promise<boolean> {
    try {
      if (!currentUser) {
        return false;
      }

      return comment.userId === currentUser.id;
    } catch {
      return false;
    }
  }

  @Query(() => ReadCommentsOutput)
  async readComments(
    @Args('input') readCommentsInput: ReadCommentsInput,
  ): Promise<ReadCommentsOutput> {
    return this.commentService.readComments(readCommentsInput);
  }

  @Query(() => ReadCommentsLikeSortOutput)
  async readCommentsLikeSort(
    @Args('input') readCommentsLikeSortInput: ReadCommentsLikeSortInput,
  ): Promise<ReadCommentsLikeSortOutput> {
    return this.commentService.readCommentsLikeSort(readCommentsLikeSortInput);
  }

  @Mutation(() => CreateCommentOutput)
  @UseGuards(AuthGuard)
  async createComment(
    @Args('input') createCommentInput: CreateCommentInput,
    @CurrentUser() author: User,
  ): Promise<CreateCommentOutput> {
    return this.commentService.createComment(createCommentInput, author);
  }

  @Mutation(() => DeleteCommentOutput)
  @UseGuards(AuthGuard)
  async deleteComment(
    @Args('input') deleteCommentInput: DeleteCommentInput,
    @CurrentUser() currentUser: User,
  ): Promise<DeleteCommentOutput> {
    return this.commentService.deleteComment(deleteCommentInput, currentUser);
  }

  @ResolveField(() => Int)
  async commentLikeCount(@Parent() comment: Comment): Promise<number> {
    const count = await this.prismaService.commentLike.count({
      where: {
        commentId: comment.id,
      },
    });
    return count;
  }
}
