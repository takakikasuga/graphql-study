import { ImpressionModule } from '@app-impressions/impression.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [PrismaModule, ImpressionModule],
})
export class PostsModule {}
