export const MAIN_PATH = '/';
export const AUTH_PATH = '/auth' ;
//  변수 상수처럼 사용
export const SEARCH_PATH = (word : string) => '/search/${word}' ;
export const BOARD_DETAIL_PATH = (boardNumber : number | string) => '/board/detail/${boardNumber}' ;
export const BOARD_WRITE_PATH = '/board/write';
export const BOARD_UPDATE_PATH =  (word : string) => '/board/update/${boardNumber}' ;
export const USER_PATH = (email :string) => '/user/${email}';
    