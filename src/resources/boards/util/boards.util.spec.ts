import { UpdateBoardDto } from '../dto/update-board.dto';
import { Board } from '../entities/board.entity';
import { History } from '../entities/history.entity';
import { HistoryContent } from '../entities/historyContent.entity';
import { HistoryIntro } from '../entities/historyIntro.entity';
import { boardDtoToEntity } from './boards.utils';

describe('Boards Utils', () => {
  it('dto in boardDtoToEntity() should have optional parameter', () => {
    const onlyHasTitleDto: UpdateBoardDto = {
      title: 'title',
    };
    const onlyHasTitleEntity = new Board();
    onlyHasTitleEntity.title = 'title';
    expect(boardDtoToEntity(onlyHasTitleDto)).toEqual(onlyHasTitleEntity);

    const onlyHaveIntrosDto: UpdateBoardDto = {
      historys: [
        {
          intros: ['intro'],
          contents: ['content'],
        },
      ],
    };
    const onlyHaveHistorysBoard = new Board();
    const history = new History();
    const historyIntro = new HistoryIntro();
    historyIntro.intro = 'intro';
    const historyContent = new HistoryContent();
    historyContent.content = 'content';
    history.intros = [historyIntro];
    history.contents = [historyContent];
    onlyHaveHistorysBoard.historys = [history];
    expect(boardDtoToEntity(onlyHaveIntrosDto)).toEqual(onlyHaveHistorysBoard);
  });
});
