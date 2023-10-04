import { BoardListItem } from "types";
import ResponseDto from "..";

export default interface GetLastestBoardListResponseDto extends ResponseDto{
    // lastest
    latestList : BoardListItem[];
}