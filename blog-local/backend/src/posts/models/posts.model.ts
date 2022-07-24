import {
  Field,
  Int,
  ObjectType,
  GraphQLISODateTime,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  emoji?: string;

  @Field((type) => PostType)
  type: PostType;

  @Field((type) => String, { nullable: true })
  thumbNailUrl: string;

  @Field((type) => String, { nullable: true })
  excerpt: string;

  @Field((type) => String)
  contentPath: string;

  @Field((type) => String)
  md5Hash: string;

  @Field((type) => Boolean, { nullable: true })
  published: boolean;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  publishDate: Date;

  @Field((type) => Int)
  like: number;
}

export enum PostType {
  article = 'article',
  diary = 'diary',
}

registerEnumType(PostType, {
  name: 'PostType',
});
