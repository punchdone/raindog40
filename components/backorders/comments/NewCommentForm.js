import { useRef, useState } from "react";
// import { useSession } from "next-auth/client";
import classes from "./NewCommentForm.module.css";

function NewCommentForm(props) {
  const [comment, setComment] = useState();
  const contentInputRef = useRef();
  // const [session] = useSession();
  // const author = session?.user.id;
  const author = 'scotty dog';

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredContent = contentInputRef.current.value;
    const contentType = "62335eafbf1afcd95f2c9217";

    const commentData = {
      content: enteredContent,
      author,
      type: contentType,
    };

    console.log(commentData);

    props.onSubmit(commentData);

    setComment('');

    

    // setComment("");
  };

//   const handleCommentChange = (e) => {
//     setComment((prevState) => {
//       return { ...prevState, comment: e.target.value };
//     });
//   };

  return (
    <form onSubmit={submitHandler}>
      <p className={classes.formTitle}>Add Comment</p>
      <div className={classes.commentForm}>
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          ref={contentInputRef}
        //   onChange={handleCommentChange}
          value={comment}
        ></input>
        <button>Add</button>
      </div>
    </form>
  );
}

export default NewCommentForm;
