import React, { ChangeEvent, useRef, useState, useEffect }  from 'react';
import './style.css';
import { useBoardStore } from 'stores';

export default function BoardWrite() {


    //          state: 이미지 인풋 ref 상태          //
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    //          state: 본문 텍스트 영역 ref 상태          //
    const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
    //          state: 게시물 상태          //
    const { title, setTitle } = useBoardStore();
    const { contents, setContents } = useBoardStore();
    const { images, setImages, resetBoard } = useBoardStore();
    //          state: 게시물 이미지 URL 상태          //
    const [imageUrls, setImageUrls] = useState<string[]>([]);
  
    
    //          event handler: 제목 변경 이벤트 처리          //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const title = event.target.value;
      setTitle(title);
    }
    //          event handler: 내용 변경 이벤트 처리          //
    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const contents = event.target.value;
      setContents(contents);
      if (!contentsTextAreaRef.current) return;
      contentsTextAreaRef.current.style.height = 'auto';
      contentsTextAreaRef.current.style.height = `${contentsTextAreaRef.current.scrollHeight}px`;
    }

    //          event handler: 이미지 변경 이벤트 처리          //
    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      const newImageUrls = imageUrls.map(url => url);
      newImageUrls.push(imageUrl);
      const newImages = images.map(image => image);
      newImages.push(file);

      setImageUrls(newImageUrls);
      setImages(newImages);
    }      
  return (
    <div>BoardWrite</div>
  )
}
