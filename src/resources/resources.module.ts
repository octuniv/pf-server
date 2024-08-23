import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ParagraphsModule } from './paragraphs/paragraphs.module';
@Module({
  imports: [UsersModule, ParagraphsModule],
})
export class ResourcesModule {}
