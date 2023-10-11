import { BoardListItem } from "types";
import ResponseDto from "..";

export default interface GetSearchBoardListResponstDto extends ResponseDto{
    searchList : BoardListItem[];
}