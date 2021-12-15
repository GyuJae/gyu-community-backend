import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  name: string;
  @Field(() => String)
  password: string;

  @Field(() => String)
  role: string;
}

enum Role {
  USER,
  ADMIN,
}

registerEnumType(Role, {
  name: 'role',
});
