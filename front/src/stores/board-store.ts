import { create } from 'zustand';
import userUserStore from "./user.store";

interface BoardStore{
    title : string;
    contents : string;
    image : File | null;

    setTitle: (title :string) => void;
    setContents: (contents : string)  => void;
    setImage : ( image : File | null ) => void;

    resetBoard : () => void;

}

// const useBoardStore = create<BoardStore>( (set) => ( { 
//     title : '',
    
//     setTitle: (title  : string ) => { set( ( state ) => ( { title} ) )} 
// }) );

const useBoardStore = create<BoardStore>( (set) => ( { 
    title : '',
    contents : '',
    image: null,

    setTitle: (title  : string ) => { set( ( state ) => ( {...state, title} ) )},
    setContents: (contents  : string ) => { set( ( state ) => ( {...state, contents} ) )} ,
    setImage: (image  : File | null  ) => { set( ( state ) => ( {...state, image} ) )},

    resetBoard: () => { set( (state) => ({ ...state, title : '', contents : '', image : null}))}

}) );

export default useBoardStore;