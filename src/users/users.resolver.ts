import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput, CreateUserOutput } from './dto/createUser.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './users.decorator';
import { AuthGuard } from './users.guard';
import { EditUserInput, EditUserOutput } from './dto/editUser.dto';
import {
  ReadPostsByUserIdInput,
  ReadPostsByUserIdOutput,
} from './dto/readPostsByUserID.dto';
import {
  ReadPostsByUserIdLikeInput,
  ReadPostsByUserIdLikeOutput,
} from './dto/readPostsByUserIdLike.dto';
import {
  ReadPostsByUserIdCommentInput,
  ReadPostsByUserIdCommentOutput,
} from './dto/readPostsByUserIdComment.dto';
import { FindUserByIdInput, FindUserByIdOutput } from './dto/findUserById.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Query(() => ReadPostsByUserIdOutput)
  readPostsByUserId(
    @Args('input') readPostsByUserIdInput: ReadPostsByUserIdInput,
  ): Promise<ReadPostsByUserIdOutput> {
    return this.userService.readPostsByUserId(readPostsByUserIdInput);
  }

  @Query(() => ReadPostsByUserIdLikeOutput)
  readPostsByUserIdLike(
    @Args('input') readPostsByUserIdLikeInput: ReadPostsByUserIdLikeInput,
  ): Promise<ReadPostsByUserIdLikeOutput> {
    return this.userService.readPostsByUserIdLike(readPostsByUserIdLikeInput);
  }

  @Query(() => ReadPostsByUserIdCommentOutput)
  readPostsByUserIdComment(
    @Args('input') readPostsByUserIdCommentInput: ReadPostsByUserIdCommentInput,
  ): Promise<ReadPostsByUserIdCommentOutput> {
    return this.userService.readPostsByUserIdComment(
      readPostsByUserIdCommentInput,
    );
  }

  @Query(() => FindUserByIdOutput)
  findUserById(
    @Args('input') findUserByIdInput: FindUserByIdInput,
  ): Promise<FindUserByIdOutput> {
    return this.userService.findUserById(findUserByIdInput);
  }

  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Mutation(() => EditUserOutput)
  @UseGuards(AuthGuard)
  async editUser(
    @Args('input') editUserInput: EditUserInput,
    @CurrentUser() user: User,
  ): Promise<EditUserOutput> {
    return this.userService.editUser(editUserInput, user);
  }
}
