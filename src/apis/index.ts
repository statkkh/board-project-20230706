import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import { SignUpResponseDto ,SignInResponseDto} from "./dto/response/auth";
import ResponseDto from './dto/response';
import { GetSignInUserResponseDto, GetUserReponseDto } from "./dto/response/user";
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from "./dto/request/board";
import { PostBoardResponseDto, GetLatestBoardListResponseDto , GetBoardResponseDto, GetFavoriteListResponseDto, PutFavoriteResponseDto, GetCommentListResponseDto, PostCommentResponseDto, PatchBoardResponseDto, DeleteBoardResponseDto, GetUserBoardListResponseDto} from "./dto/response/board";



// description : Domain URL //
const DOMAIN = "http://localhost:4000";

// description : api Domain 주소     //
const API_DOMAIN = `${DOMAIN}/api/v1`;
// description : Authorizaition header //
const authorization = (token : string) =>  {
    return {headers : {Authorization :`Bearer ${token}`} };
};

// description : sign up API end point // 
const SIGN_UP_URL = () =>`${API_DOMAIN}/auth/sign-up`;
// description : sign in API end point // 
const SIGN_IN_URL = () =>`${API_DOMAIN}/auth/sign-in`;

// description : sign up Request  타데이터 없음//
export const signUpRequest = async (requestBody : SignUpRequestDto) =>{
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response =>{
            const responseBody : SignUpResponseDto = response.data;
            const {code} =  responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const {code} = responseBody;
            return code;
        });
    return result;
};

// description : sign in Request //
export const signInRequest = async (requestBody : SignInRequestDto) =>{
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response =>{
            const responseBody:SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => { 
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });                    
    return result;
};

// description : get board API end Point //
const GET_BOARD_URL = (boardNumber : string | number) => `${API_DOMAIN}/board/${boardNumber}`;
// description : get   favorite end Point //
const GET_FAVORITE_LIST_URL = (boardNumber : string | number ) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
// description : get comment list API end Point //
const GET_COMMENT_LIST_URL = (boardNumber : string | number ) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
// description : get latest board list API end point // 
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;
// description : get user board list API end point //
const GET_USER_BOARD_LIST_URL = (email : string) => `${API_DOMAIN}/board/user-board-list/${email}`;
// description :  post board API end Point //
const POST_BOARD_URL =() => `${API_DOMAIN}/board`;
// description :  post comment API end Point //
const POST_COMMENT_URL = (boardNumber : string | number) => `${API_DOMAIN}/board/${boardNumber}/comment`;
// description : put favorite list request  //
const PUT_FAVORITE_URL  = (boardNumber : string | number ) =>`${API_DOMAIN}/board/${boardNumber}/favorite`;
// description :  patch board  API end Point //
const PATCH_BOARD_URL = (boardNumber : string | number) => `${API_DOMAIN}/board/${boardNumber}`;
// description: delete board API end Point //
const DELETE_BOARD_URL = (boardNumber : string | number) => `${API_DOMAIN}/board/${boardNumber}`;

// description :  get board request //
export const getBoardRequest = async(boardNumber : string | number)=>{
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response =>{  
            const responseBody : GetBoardResponseDto = response.data;
            return responseBody; 
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
        return result;          
}

// description :  get favorite list request //
export const getFavoriteListRequest = async(boardNumber : string | number) =>{
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
        .then(response =>{
            const responseBody : GetFavoriteListResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })
        return result;
}

// description : get latest board list request   //
export const getLatestBoardListRequest = async()=>{
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
        .then(response =>{   
            const responseBody : GetLatestBoardListResponseDto = response.data;
            return responseBody;            
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;    
}

// description : get user board list request //
export const getUserBoardListReqest = async(email : string) =>{
    const result = await axios.get(GET_USER_BOARD_LIST_URL(email))
        .then(response =>{
            const responseBody : GetUserBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error=>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })
    return result;   
}

// description :patch board request// 
export const patchBoardRequest = async(requestBody : PatchBoardRequestDto , boardNumber: string | number , token : string) =>{
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(token))
        .then(response =>{
            const responseBody: PatchBoardResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody: ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;            
        })
    return result;
};

// description :  delete board list request //
export const deleteBoardRequest = async(boardNumber : string | number, token : string ) =>{
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(token))
        .then(response =>{
            const responseBody : DeleteBoardResponseDto = response.data;
            const {code} = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.reponse.data;
            const {code} = responseBody;
            return code;
         })
        return result;
}

// description :  get comment list request //
export const getCommentListRequest = async(boardNumber : string | number) =>{
    const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
        .then(response =>{
            const responseBody : GetCommentListResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })
    return result;      
};

// description :  post board request //
export const postBoardRequest = async (requestBody : PostBoardRequestDto, token : string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(token))
        .then(response =>{
            const responseBody : PostBoardResponseDto = response.data;
            const  { code } = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const  { code } = responseBody;
            return code;
        });
    return result;        
}
// description :  post comment request //
export const postCommentRequest = async(requestBody : PostCommentRequestDto , boardNumber:string, token:string)=> {
    const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(token))
        .then(response =>{
            const responseBody : PostCommentResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        });
    return result;          
}

// description : put favorite request //
export const putFavoriteRequest = async( boardNumber : string | number , token : string) => {
    const result = await axios.put(PUT_FAVORITE_URL(boardNumber) ,{}, authorization(token) )
        .then(response =>{
            const responseBody : PutFavoriteResponseDto = response.data 
            const  { code } = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const  { code } = responseBody;
            return code;
        });
 
    return result; 
}

// description : get sign in use API end Point Request //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

// description: get user API end point //
const GET_USER_URL = (email : string) => `${API_DOMAIN}/user/${email}`;

// description :  get sign in request //
export const getSignInUserRequest = async (token : string) => {
    const result = await axios.get( GET_SIGN_IN_USER_URL(), authorization(token))
        .then(response =>{
            const responseBody : GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error=>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;    
};

// description : get user request  //
export const getUserRequest = async(email : string ) => {
    const result = await axios.get(GET_USER_URL(email))
        .then(response =>{
            const responseBody : GetUserReponseDto = response.data;
            return responseBody; 
        })
        .catch(error=>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })

    return result;
};

// description : FILE DOMAIN 주소 //
const FILE_DOMAIN = `${DOMAIN}/file`;

// description :  file upload end point  //
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

// description :  file content type Header //
const multipart =  {headers : {'Content-Type' : 'multipart/form-data'} };

// description: file upload request //
export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipart)
        .then(response => {
            const responseBody: string = response.data;
            return responseBody;
        })
        .catch(error => {
            return null;
        });
    return result;
} 
 