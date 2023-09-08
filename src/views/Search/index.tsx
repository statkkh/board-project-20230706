import  { useEffect, useState } from 'react';
import './style.css';
import { boardMock, relationWordListMock, searchListMock } from 'mocks';
import { useNavigate, useParams } from 'react-router-dom';
import { usePagination } from 'components/hooks';
import { SEARCH_PATH } from 'constant';
import BoardListItem from 'components/BoardListItem';
import Pagination from 'components/Pagination';
import { BoardItem } from 'types';

export default function Search() {
  

  const {word} = useParams();

  const {currentPageNumber, currentSectionNumber, setCurrentPageNumber, setCurrentSectionNumber, viewBoardList, viewPageNumberList, totalSection, setBoardList} = usePagination<BoardItem>(5); 

  //          state: 검색 결과 개수 상태          //
  const [count, setCount] = useState<number>(0);   

  //          state: 연관 검색어 리스트 상태          //
  const [relationWordList, setRelationWordList] = useState<string[]>([]);  

  //          function: 네비게이트 함수          //
  const navigator = useNavigate();
    
  //          event handler: 관련 검색어 뱃지 클릭 이벤트 처리          //
  const onWordBadgeClickHandler = (word: string) => {
    navigator(SEARCH_PATH(word));
  }
  
  //          effect: 'word' path variable이 변경될 때 마다 검색 결과 불러오기          //
  useEffect(() => {
    if (!word) return;
    const boardList = searchListMock(word);
    setBoardList(boardList);
    setCount(boardList.length);
    setRelationWordList(relationWordListMock);
  }, [word]);  

  //          render: 검색 페이지 렌더링          //  
  return (
    <div id = 'search-wrapper'>
      <div className='search-container'>
        <div className='search-title-box'>
          <div className='search-title'><span className='search-title-emphasis'>{boardMock?.title}</span>{'에 대한 검색결과 입니다.'}</div>
          <div className='search-count'>{count}</div>
        </div>    
          <div className='search-contents-box'>
            {/* 검색키워드 포함된 게시물 불러오기 */}
            {count===0 ? (
                <div className='search-contents-result-nothing'>{'검색 결과가 없습니다.'}</div>                 
            ) : (
              <div className='search-contents-result-box'>
              { viewBoardList.map(boardItem => <BoardListItem boardItem={boardItem} />) }
              </div>
            )}
            <div className='search-relation-word-box'>
              <div className ='search-relation-word-card'>
                <div className='search-relation-card-box'>
                  <div className='search-relation-card-title'>{'관련 검색어'}</div>
                  {relationWordList.length === 0 ? (
                  <div className='search-relation-card-contents-nothing'>{'관련 검색어가 없습니다.'}</div>
                  ) : (
                  <div className='search-relation-card-contents'>
                    {relationWordList.map(relationWord => <div className='word-badge' onClick={() => onWordBadgeClickHandler(relationWord)}>{relationWord}</div>)}
                  </div>
                  )}
                </div>
              </div> 
            </div>
          </div>
          { count !== 0 && (
              <div className='search-pagination-box'>
              <Pagination 
                currentPageNumber={currentPageNumber}
                currentSectionNumber={currentSectionNumber}
                setCurrentPageNumber={setCurrentPageNumber}
                setCurrentSectionNumber={setCurrentSectionNumber}
                viewPageNumberList={viewPageNumberList}
                totalSection={totalSection}
              />
            </div>
          )}          
      </div>
    </div>
  )
}
