import { BoardItem } from 'types';
import currentBoardListMock from './current-board-list.mock';

const searchListMock = (word: string): BoardItem[] => {
    const list = currentBoardListMock.filter(boardItem => boardItem.title.includes(word) || boardItem.contents.includes(word));
    return list;
}

export default searchListMock;