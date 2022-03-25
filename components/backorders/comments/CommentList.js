import { Fragment, useState, useEffect } from 'react';
import classes from './CommentList.module.css'
import CommentItem from './CommentItem';
import NewCommentForm from './NewCommentForm';

function CommentList(props) {
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        setComments(props.comments);
    }, []);

    const createComment = async (data) => {

        const commentUrl = '/api/backorders/' + props.backorderId + '/comments';

        const response = await fetch(commentUrl, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setComments((prevComments) => prevComments.concat(data));
    };


    return (
        <Fragment>
            <p className={classes.commentTitle}>Status Log</p>
            <div className={classes.commentGrid}>
                <div>Date</div>
                <div>Type</div>
                <div>Comment</div>
                <div>Author</div>
            </div>
            <ul className={classes.commentList}>
                {comments.map((comment) => (
                    <CommentItem 
                        key={comment._id} 
                        id={comment._id} 
                        content={comment.content}
                        author={comment.author}
                        type={comment.type}
                        date={comment.createdDate}
                    />
                ))}
            </ul>
            <NewCommentForm id={props.backorderId} onSubmit={createComment} />
        </Fragment>
        
    )
};

export default CommentList;