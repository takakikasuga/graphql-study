import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
/**
 * アプリケーションモジュールで利用する設定値は、ここから取得します。
 */
@Injectable()
export class AppEnv {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get NodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get Port(): number {
    return this.configService.get<number>('PORT');
  }

  get DatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  get GqlModuleOptionsFactory(): ApolloDriverConfig {
    // 開発：コードからスキーマを生成し、Playgroundも利用する。
    // バックエンドのコードが正なのでコードファーストアプローチを使う
    const devOptions: ApolloDriverConfig = {
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      playground: false,
      debug: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    };

    // 本番環境：実行だけ
    const prdOptions: ApolloDriverConfig = {
      autoSchemaFile: true,
      debug: false,
      playground: false,
    };
    if (this.isProduction()) {
      return prdOptions;
    } else {
      return devOptions;
    }
  }
}
