import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetPostsArgs } from './dtos/posts.args';
import { FindPostArgs } from './dtos/findPost.args';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(args: GetPostsArgs) {
    return await this.prisma.post.findMany({
      where: {
        type: {
          in: args.type,
        },
        published: true, // ついでに指定。公開ブログへ渡すデータなのでtrue固定にしちゃう
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }

  async findPost(args: FindPostArgs) {
    return await this.prisma.post.findUnique({
      rejectOnNotFound: true,
      where: {
        id: args.id,
        contentPath: args.contentPath,
      },
    });
  }
}
