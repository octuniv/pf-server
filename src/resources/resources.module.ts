import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ParagraphsModule } from './paragraphs/paragraphs.module';
import { BoardsModule } from './boards/boards.module';
@Module({
  imports: [UsersModule, ParagraphsModule, BoardsModule],
})
export class ResourcesModule {}
