import { PrismaModule } from '@app-prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ImpressionService } from './impression.service';
import { ImpressionResolver } from './impressions.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ImpressionResolver, ImpressionService],
  exports: [ImpressionService],
})
export class ImpressionModule {}
