import { PartialHistoryDto } from '../dto/partial-history.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { Board } from '../entities/board.entity';
import { History } from '../entities/history.entity';
import { HistoryContent } from '../entities/historyContent.entity';
import { HistoryIntro } from '../entities/historyIntro.entity';

export const boardDtoToEntity = (dto: UpdateBoardDto) => {
  const board = new Board();
  if (dto.title) {
    board.title = dto.title;
  }
  if (dto.historys) {
    board.historys = dto.historys.map((hist) => historyDtoToEntity(hist));
  }

  return board;
};

export const historyDtoToEntity = (histDto: PartialHistoryDto) => {
  const historyEntity = new History();
  historyEntity.subtitle = histDto.subtitle;
  historyEntity.intros = histDto.intros.map((intro) => {
    const historyIntro = new HistoryIntro();
    historyIntro.intro = intro;
    return historyIntro;
  });
  historyEntity.contents = histDto.contents.map((content) => {
    const historyContent = new HistoryContent();
    historyContent.content = content;
    return historyContent;
  });
  return historyEntity;
};
