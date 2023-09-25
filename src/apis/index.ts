import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import { SignUpResponseDto ,SignInResponseDto} from "./dto/response/auth";
import ResponseDto from './dto/response';
import { GetSignInUserResponseDto } from "./dto/response/user";

// description : api Domain 주소     //
const API_DOMAIN = 'http://localhost:4000/api/v1';
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
            const responseBody = Response = error.response.data;
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

// description : get sign in use API end Point Request //
const GET_SIGN_IN_USER_URL = async() => `${(API_DOMAIN)}/auth/sign-in`;

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
