import AddPicker from "./SmallComponent/AddPicker";


export const EditPost = ({
    edit,
    editCommentInput,
    setEditComment,
    comment,
    setEdit,
    sendEditComment,
  }) => {
    return (
      <>
        {edit ? (
          <>
            <div>
              <textarea
                value={editCommentInput}
                onChange={(e) => setEditComment(e.target.value)}
                className="editArea"
              ></textarea>
            </div>
  
            <div className="d-flex">
              <AddPicker classNem="picker-comment" setInput={setEditComment} />
  
              <button
                onClick={() => {
                  sendEditComment(comment.id);
                }}
                className="btn btn-primary"
              >
                Edit
              </button>
  
              <button
                onClick={() => setEdit(false)}
                className="btn btn-danger mx-2"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="mx-4 mt-2">{comment.body}</p>
        
        )}
      </>
    );
  };
  