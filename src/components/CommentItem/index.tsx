import './style.css';
import { CommentListItem } from 'types';
import DefaultProfileImage from 'assets/default-profile-image.png'

 
interface Props {
  commentItem: CommentListItem;
}

//          component: 댓글 리스트 아이템 컴포넌트          //
export default function CommentItem({ commentItem }: Props) {

  //          state: Properties          //
  const { content, writeDatetime, nickname, profileImageUrl } = commentItem;

  //          render: 댓글 리스트 아이템 컴포넌트 렌더링          //
  return (
    <div className='comment-list-item-box'>
      <div className='comment-list-item-top'>
        <div className="comment-profile-box">
          <div className='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImageUrl ? profileImageUrl : DefaultProfileImage})` }}></div>
        </div>
        <div className="comment-list-item-nickname">{nickname}</div>
        <div className="comment-list-item-divider">{"\|"}</div>
        <div className="comment-list-item-time">{writeDatetime}</div>
      </div>
      <div className='comment-list-item-main'>
        <div className='comment-list-item-contents'>{content}</div>
      </div>    
    </div>
  )
}
