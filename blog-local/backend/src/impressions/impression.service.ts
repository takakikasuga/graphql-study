import { GetImpressionsArgs } from '@app-impressions/dtos/getImpressions.args';
import { PrismaService } from '@app-prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Impression } from '@prisma/client';
import { CreateImpressionInput } from './dtos/createImpressions.input';

@Injectable()
export class ImpressionService {
  constructor(private readonly prisma: PrismaService) {}

  async search(args: GetImpressionsArgs): Promise<Impression[]> {
    return await this.prisma.impression.findMany({
      where: {
        postId: args.postId,
      },
      take: args.first,
      orderBy: {
        createdAt: args.sortAs,
      },
    });
  }

  async add(input: CreateImpressionInput): Promise<Impression> {
    console.log('input === ', input);
    return await this.prisma.impression.create({
      data: input,
    });
  }
}
