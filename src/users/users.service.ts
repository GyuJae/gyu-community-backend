import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { EditUserInput, EditUserOutput } from './dto/editUser.dto';
import { User } from './models/user.model';
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

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({
    name,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const userExist = await this.prismaService.user.findUnique({
        where: { name },
        select: {
          id: true,
        },
      });
      if (userExist) {
        return {
          ok: false,
          error: 'This name already exist',
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await this.prismaService.user.create({
        data: {
          name,
          password: hashPassword,
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

  async login({ name, password }: LoginInput): Promise<LoginOutput> {
    try {
      const userExist = await this.prismaService.user.findUnique({
        where: { name },
        select: { password: true, id: true },
      });
      if (!userExist) {
        return {
          ok: false,
          error: "this username don't exist",
        };
      }

      const passwordCompare = await bcrypt.compare(
        password,
        (
          await userExist
        ).password,
      );
      if (!passwordCompare) {
        return {
          ok: false,
          error: 'Password Wrong',
        };
      }
      const token = await this.jwtService.sign({
        id: (await userExist).id,
      });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editUser({ name }: EditUserInput, user: User): Promise<EditUserOutput> {
    try {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
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

  async readPostsByUserId({
    userId,
    skip,
    take,
  }: ReadPostsByUserIdInput): Promise<ReadPostsByUserIdOutput> {
    try {
      const existUserId = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });
      if (!existUserId) {
        return {
          ok: false,
          error: 'This userId does not exist',
        };
      }
      const posts = await this.prismaService.post.findMany({
        where: { userId },
        skip,
        take,
      });
      const postsCount = await this.prismaService.post.count({
        where: { userId },
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

  async readPostsByUserIdLike({
    userId,
    skip,
    take,
  }: ReadPostsByUserIdLikeInput): Promise<ReadPostsByUserIdLikeOutput> {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });
      if (!userExists) {
        return {
          ok: false,
          error: 'This user id does not exist',
        };
      }
      const like = await this.prismaService.like.findMany({
        where: { userId },
      });
      const posts = await this.prismaService.post.findMany({
        where: {
          id: {
            in: like.map((item) => item.postId),
          },
        },
        skip,
        take,
      });
      const postsCount = await this.prismaService.post.count({
        where: {
          id: {
            in: like.map((item) => item.postId),
          },
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

  async readPostsByUserIdComment({
    userId,
    skip,
    take,
  }: ReadPostsByUserIdCommentInput): Promise<ReadPostsByUserIdCommentOutput> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return {
          ok: false,
          error: 'This User id does not exists',
        };
      }
      const comments = await this.prismaService.comment.findMany({
        where: { userId },
      });
      const posts = await this.prismaService.post.findMany({
        where: {
          id: {
            in: comments.map((item) => item.postId),
          },
        },
        skip,
        take,
      });
      const postCoount = await this.prismaService.post.count({
        where: {
          id: {
            in: comments.map((item) => item.postId),
          },
        },
      });
      return {
        ok: true,
        posts,
        totalPages: Math.ceil(postCoount / take),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
