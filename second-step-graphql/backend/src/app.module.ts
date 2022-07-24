import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './components/posts/posts.module';
import * as path from 'path';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(
        process.cwd(),
        'src/generated/graphql/schema.gql',
      ),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PostsModule, // これ
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
