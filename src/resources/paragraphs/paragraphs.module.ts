import { Module } from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service';
import { ParagraphsController } from './paragraphs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paragraph } from './entities/paragraph.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paragraph])],
  controllers: [ParagraphsController],
  providers: [ParagraphsService],
})
export class ParagraphsModule {}
