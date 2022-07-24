import { PostType } from '@app-posts/models/posts.model';
import { ArgsType, Field } from '@nestjs/graphql';
import { PostType as PrismaPostType } from '@prisma/client';

@ArgsType()
export class GetPostsArgs {
  @Field((type) => [PostType], { nullable: true })
  type?: PrismaPostType[];
}
