import { faker } from '@faker-js/faker';
import { HistoryDto } from '../dto/history.dto';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { Board } from '../entities/board.entity';
import { History } from '../entities/history.entity';
import { HistoryContent } from '../entities/historyContent.entity';
import { HistoryIntro } from '../entities/historyIntro.entity';

export const MakeHistoryDtoFaker = () => {
  const historyDto = new HistoryDto();
  historyDto.subtitle = faker.lorem.sentence();
  historyDto.intros = faker.helpers.uniqueArray(faker.lorem.sentence, 2);
  historyDto.contents = faker.helpers.uniqueArray(faker.lorem.sentence, 3);
  return historyDto;
};

export const MakeBoardDtoFaker = () => {
  const boardDto = new CreateBoardDto();
  boardDto.title = faker.lorem.sentence();
  boardDto.historys = Array(2)
    .fill(null)
    .map(() => MakeHistoryDtoFaker());
  return boardDto;
};

export const MakeBoardDtoHasOnlyTitleFaker = () => {
  const boardDto = new UpdateBoardDto();
  boardDto.title = faker.lorem.sentence();
  return boardDto;
};

export const MakeBoardDtoHasOnlySubtitleFaker = () => {
  const boardDto = new UpdateBoardDto();
  const historyDto = new HistoryDto();
  historyDto.subtitle = faker.lorem.sentence();
  boardDto.historys = [historyDto];
  return boardDto;
};

export const MakePartialHistoryDtoFaker = () => {
  const historyDto = new HistoryDto();
  historyDto.intros = ['aaa'];
  return historyDto;
};

export const MakeBoardDtoHasOnlyIntroFaker = () => {
  const boardDto = new UpdateBoardDto();
  const historyDto = new HistoryDto();
  historyDto.intros = [faker.lorem.sentence()];
  boardDto.historys = [historyDto];
  return boardDto;
};

export const MakeBoardEntityFaker = () => {
  const board = new Board();
  board.title = faker.lorem.sentence();
  board.historys = Array(2)
    .fill('')
    .map(() => MakeHistoryEntityFaker());
  return board;
};
const MakeHistoryIntroEntityFaker = () => {
  const historyIntro = new HistoryIntro();
  historyIntro.intro = faker.lorem.sentence();
  return historyIntro;
};

const MakeHistoryContentEntityFaker = () => {
  const historyContent = new HistoryContent();
  historyContent.content = faker.lorem.sentence();
  return historyContent;
};

export const MakeHistoryEntityFaker = () => {
  const history = new History();
  history.subtitle = faker.lorem.sentence();
  history.intros = Array(2)
    .fill('')
    .map(() => MakeHistoryIntroEntityFaker());
  history.contents = Array(3)
    .fill('')
    .map(() => MakeHistoryContentEntityFaker());
  return history;
};
