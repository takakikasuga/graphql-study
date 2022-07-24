import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateImpressionInput } from './dtos/createImpressions.input';
import { GetImpressionsArgs } from './dtos/getImpressions.args';
import { ImpressionService } from './impression.service';
import { ImpressionModel } from './models/impression.model';

@Resolver((of) => ImpressionModel)
export class ImpressionResolver {
  constructor(private service: ImpressionService) {}

  @Query(() => [ImpressionModel], { name: 'impressions', nullable: true })
  async getImpressions(@Args() args: GetImpressionsArgs) {
    return this.service.search(args);
  }

  @Mutation(() => ImpressionModel, { name: 'addImpressions', nullable: true })
  async addImpressions(@Args('input') input: CreateImpressionInput) {
    return this.service.add(input);
  }
}
