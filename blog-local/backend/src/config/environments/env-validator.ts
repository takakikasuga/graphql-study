import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

enum NodeEnvEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/**
 * ①
 * バリデーションしたい環境変数がある場合はここに記載してください。
 * バリデーションに失敗するとアプリケーションは起動しません。
 */
export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;
  constructor() {
    this.PORT = 8888;
  }
}

/**
 * ②
 * @param config バリデーション対象の Record<string, any>。今回は .env.development.local と 環境変数が合体したもの
 * @returns バリデーション済の Record<string, any>
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });
  console.log(validatedConfig);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  console.log('errors === ', errors);
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
