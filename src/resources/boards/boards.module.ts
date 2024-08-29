import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { History } from './entities/history.entity';
import { HistoryIntro } from './entities/historyIntro.entity';
import { HistoryContent } from './entities/historyContent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, History, HistoryIntro, HistoryContent]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
