import { AiOutlineDelete } from "react-icons/ai";
import {
  BiUserPlus,
  BiEditAlt,
  BiBlock,
} from "react-icons/bi";
import {
  delComment,
} from "../../redux/asyncActions/CommentAsync";

export const DropdownContent = ({ user, comment, setEdit, setCurIndex, dispatch }) => {
    return (
      <>
        {user?.email !== comment?.author.email && (
          <>
              <p>
              <BiBlock color="#e0245e"/> <span>Not your's Boi</span>
          </p>
           
          </>
        )}
        {user?.email === comment?.author.email && (
          <>
            <p
              onClick={() => {
                setEdit(true);
                setCurIndex(null);
              }}
            >
              <BiEditAlt />
              <span>Edit Reply</span>
            </p>
            <p
              onClick={() => {
                dispatch(delComment(comment.id));
                setCurIndex(null);
              }}
            >
              <AiOutlineDelete color="#e0245e" />
              <span style={{ color: "#e0245e" }}>Delete Reply</span>
            </p>
          </>
        )}
      </>
    );
  };
  
  