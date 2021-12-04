import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { CurrentUser } from 'src/users/users.decorator';
import { AuthGuard } from 'src/users/users.guard';
import {
  LikeCommentToggleInput,
  LikeCommentToggleOutput,
} from './dto/likeCommentToggle.dto';
import { LikeToggleInput, LikeToggleOutput } from './dto/likeToggle.dto';
import { LikesService } from './likes.service';
import { Like } from './models/like.model';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likeService: LikesService) {}

  @Mutation(() => LikeToggleOutput)
  @UseGuards(AuthGuard)
  async likeToggle(
    @Args('input') likeToggleInput: LikeToggleInput,
    @CurrentUser() currentUser: User,
  ): Promise<LikeToggleOutput> {
    return this.likeService.likeToggle(likeToggleInput, currentUser);
  }

  @Mutation(() => LikeCommentToggleOutput)
  @UseGuards(AuthGuard)
  async likeCommentToggle(
    @Args('input') likeCommentToggleInput: LikeCommentToggleInput,
    @CurrentUser() currentUser: User,
  ): Promise<LikeCommentToggleOutput> {
    return this.likeService.likeCommentToggle(
      likeCommentToggleInput,
      currentUser,
    );
  }
}
