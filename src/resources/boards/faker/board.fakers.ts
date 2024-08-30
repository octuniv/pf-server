import { faker } from '@faker-js/faker';
import { HistoryDto } from '../dto/history.dto';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

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

export const MakeBoardDtoHasOnlyIntroFaker = () => {
  const boardDto = new UpdateBoardDto();
  const historyDto = new HistoryDto();
  historyDto.intros = [faker.lorem.sentence()];
  boardDto.historys = [historyDto];
  return boardDto;
};
