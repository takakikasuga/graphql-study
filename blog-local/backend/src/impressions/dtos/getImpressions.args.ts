import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

@ArgsType()
export class GetImpressionsArgs {
  @Field({ nullable: true })
  postId?: string;

  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field((type) => SortAs, { defaultValue: 'desc' })
  sortAs?: 'asc' | 'desc';
}

export enum SortAs {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortAs, {
  name: 'SortAs',
});
