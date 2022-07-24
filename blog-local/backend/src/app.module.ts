import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsModule } from './posts/posts.module';
import { AppEnvModule } from './config/environments/app-env.module';
import { AppEnv } from '@app-config/environments/app-env.service';
import { ImpressionModule } from '@app-impressions/impression.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [AppEnv],
      useFactory: (env: AppEnv) => env.GqlModuleOptionsFactory,
    }),
    AppEnvModule,
    PostsModule,
    ImpressionModule,
  ],
})
export class AppModule {}
