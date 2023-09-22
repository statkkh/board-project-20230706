import { create } from 'zustand';

interface BoardStore {
    title: string;
    contents: string;
    images: File[];

    setTitle: (title: string) => void;
    setContents: (contents: string) => void;
    setImage: (image: File | null) => void;

    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: '',
    contents: '',
    images: [],

    setTitle: (title: string) => {set((state) => ({ ...state, title }))},
    setContents: (contents: string) => {set((state) => ({ ...state, contents }))},
    setImage: (image: File | null) => {set((state) => ({ ...state, image }))},
    // 게시물 작성중 다른 페이지 이동후 다시 왔을 때 reset 
    resetBoard: () => {set((state) => ({ ...state, title: '', contents: '', images: [] }))}
}));

export default useBoardStore;