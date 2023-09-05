import { useEffect, useState } from 'react';
import './style.css';
import { BoardItem } from 'types';
import { popularWordListMock, currentBoardListMock, top3ListMock } from 'mocks';
import Top3ListItem from 'components/Top3ListItem';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import BoardListItem from 'components/BoardListItem';

export default function Main() {

  //          component: 메인 상단 컴포넌트          //
  const MainTop = () => {
  
    //          state: 주간 Top3 게시물 리스트 상태          //
    const [top3List, setTop3List] = useState<BoardItem[]>([]);

    //          effect: 컴포넌트 마운트 시 top3 리스트 불러오기          //
    useEffect(() => {
      // TODO: API 호출로 변경
      setTop3List(top3ListMock);
    }, []);
    
    //          render: 메인 상단 컴포넌트 렌더링          //
    return (
      <div id='main-top-wrapper'>
        <div className='main-bottom-container'>
            <div className='main-top-intro'>{'Hoon Board에서\n다양한 이야기를 나눠보세요'}</div>
            <div className='main-top-contents-box'>
              <div className='main-top-contents-title'>{'주간 TOP 3 게시글'}</div>  
              <div className='main-top-contents'>
                {top3List.map(boarditem => <Top3ListItem boardItem={boarditem}/> )}
              </div>
            </div>
        </div>
      </div>
    );
  }
  //          component: 메인 하단 컴포넌트          //
  const MainBottom = () => {
    //          state: 인기 검색어 리스트 상태          //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);
    //          state: 최신 게시물 리스트 상태          //
    const [latestBoardList, setLatestBoardList] = useState<BoardItem[]>([]);

    //          state: 현재 페이지 번호 상태          //
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    //          state: 현재 섹션 번호 상태          //
    const [currentSectionNumber, setCurrentSectionNumber] = useState<number>(1);
    //          state: 보여줄 게시물 리스트 상태          //
    const [viewBoardList, setViewBoardList] = useState<BoardItem[]>([]);
    //          state: 보여줄 페이지 번호 리스트 상태          //
    const [viewPageNumberList, setViewPageNumberList] = useState<number[]>([]);

    //          function: 네비게이트 함수          //
    const navagator = useNavigate();

    //          event handler: 인기 검색어 뱃지 클릭 이벤트 처리          //
    const onWordBadgeClickHandler = (word: string) => {
      navagator(SEARCH_PATH(word));
    }

    //          effect: 컴포넌트 마운트 시 인기 검색어 리스트 불러오기          //
    useEffect(() => {
      // TODO: API 호출로 변경
      setPopularWordList(popularWordListMock);
      setLatestBoardList(currentBoardListMock);
    }, []);    

    useEffect(() => {

      // const tmpList = [];
      // for (let index = 5 * (currentPageNumber - 1); index < 5 * currentPageNumber; index++) {
      //   if (currentBoardListMock.length === index) break;
      //   tmpList.push(currentBoardListMock[index]);
      // }

      const FISRT_INDEX = 5 * (currentPageNumber - 1);
      const LAST_INDEX = 5 * currentPageNumber;
      const tmpList = currentBoardListMock.filter((item, index) => (index >= FISRT_INDEX && index < LAST_INDEX));
      
      setViewBoardList(tmpList);

    }, [currentPageNumber]);


    //          render: 메인 하단 컴포넌트 렌더링          //
    return (
      <div id='main-bottom-wrapper'>
          <div className='main-bottom-container'>

            <button onClick={() => setCurrentPageNumber(currentPageNumber + 1)}>+</button>  
            
            <div className='main-bottom-title'>{'최신 게시물'}</div>
            <div className="main-bottom-contents-box">
                <div className="main-bottom-latest-contents-box">
                  { viewBoardList.map(boardItem => <BoardListItem boardItem={boardItem} />) }
                </div>
                <div className='main-bottom-popular-word-box'>
                <div className="main-bottom-popular-word-card">
                  <div className='main-bottom-popular-card-box'>
                    <div className="main-bottom-popular-card-title">{'인기 검색어'}</div>
                    <div className="main-bottom-popular-card-contents">
                        { popularWordList.map(popularWord => <div className='word-badge' onClick={() => onWordBadgeClickHandler(popularWord)}>{popularWord}</div>) }
                    </div>
                  </div>
                </div>
              </div>  
            </div>
            <div className="main-bottom-pagination-box"></div>
          </div>
      </div>
    );
  }  

  return (
    <>
      <MainTop/>
      <MainBottom/> 
    </>
  )
}
