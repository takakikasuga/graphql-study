import { AppEnv } from '@app-config/environments/app-env.service';
import { ImpressionService } from '@app-impressions/impression.service';
import { ImpressionModel } from '@app-impressions/models/impression.model';
import { ConfigService } from '@nestjs/config';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FindPostArgs } from './dtos/findPost.args';
import { GetPostsArgs } from './dtos/posts.args';
import { PostModel } from './models/posts.model';
import { PostsService } from './posts.service';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(
    private readonly postService: PostsService,
    private configService: ConfigService,
    private impressionService: ImpressionService,
    private appEnv: AppEnv,
  ) {}

  @Query(() => [PostModel], { name: 'fixedPosts' })
  async getPostsByFixedData() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts(@Args() args: GetPostsArgs) {
    return this.postService.findAll(args);
  }

  @Query(() => String, { name: 'envs' })
  getEnvs(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV'); // development （.env.development.localのもの）
    const databaseUrl = this.configService.get<string>('DATABASE_URL'); // postgresql:/... （.env.development.localのもの）
    const microCmsKey = this.configService.get<string>('MICRO_CMS_KEY'); // 1234567890（環境変数のもの）
    // console.log(process.env);
    return [nodeEnv, databaseUrl, microCmsKey].join(' | ');
  }

  @Query(() => Int, { name: 'port' })
  getPort(): number {
    return this.appEnv.Port; // 3333 (number型になります)
  }

  @Query(() => PostModel, { name: 'findPost', nullable: false })
  async findPost(@Args() args: FindPostArgs) {
    return await this.postService.findPost(args);
  }

  @ResolveField(() => [ImpressionModel], {
    name: 'impressions',
    nullable: false,
  })
  async impressions(@Parent() post: PostModel) {
    console.log("post === ", post)
    const { id } = post;
    return this.impressionService.search({ postId: id });
  }
}
