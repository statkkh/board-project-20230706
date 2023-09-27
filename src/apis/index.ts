import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import { SignUpResponseDto ,SignInResponseDto} from "./dto/response/auth";
import ResponseDto from './dto/response';
import { GetSignInUserResponseDto, GetUserReponseDto } from "./dto/response/user";
import { PostBoardRequestDto } from "./dto/request/board";
import { PostBoardResponseDto } from "./dto/response/board";

// description : Domain URL //
const DOMAIN = "http://localhost:4000";

// description : api Domain 주소     //
const API_DOMAIN = `${DOMAIN}/api/v1`;
// description : authrorization header //
const authorization = (token : string) =>  {
    return {headers : {Authorization :`Bearer Token ${token}`}};
};

// description : sign up API end point // 
const SIGN_UP_URL = () =>`${(API_DOMAIN)}/auth/sign-up`;
// description : sign in API end point // 
const SIGN_IN_URL = () =>`${(API_DOMAIN)}/auth/sign-in`;

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

// description :  post board API end Point //
const POST_BOARD_URL =() => `${API_DOMAIN}/board`;

// description :  post board request //
export const postBoardRequest = async (requestBody : PostBoardRequestDto, token : string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(token))
            .then(response =>{
                const responseBody : PostBoardResponseDto = response.data;
                const  { code} = responseBody;
                return code;
            })
            .catch(error =>{
                const responseBody : ResponseDto = error.response.data;
                const {code} = responseBody;
                return code;
            });
    return result;        

}

// description : get sign in use API end Point Request //
const GET_SIGN_IN_USER_URL = async() => `${(API_DOMAIN)}/auth/sign-in`;

const GET_USER_URL = (email : string) => `${API_DOMAIN}/user/${email}`;


// description :  get sign in request //
export const getSignInUserRequest = async (token : string) =>{
    const result = await axios.get(await GET_SIGN_IN_USER_URL(), authorization(token))
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
export const getUserRequest = async(email : string ) =>{
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
}

// description : FILE DOMAIN 주소 //
const FILE_DOMAIN = `${DOMAIN}/file`;

// description :  file upload end point  //
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

// description :  file content type Header //
const multipart =  {headers : {'Content-Type' : 'multipart/form-data'}};

// description :  file upload request //
export const fileUploadRequest = async (data : FormData) =>{
    
    const result = await axios.post(FILE_UPLOAD_URL(), data , multipart)
        .then(response => {
            const responseBody : string  = response.data;
            return responseBody;
        })
        .catch(error =>{
            return null;
        }); 

        return result;
}   
 