import { useState } from 'react';
import dayjs from 'dayjs';

import classes from './CommentItem.module.css';

function CommentItem(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [authorName, setAuthorName] = useState();
    const [contentType, setContentType] = useState();
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     commentLookup(props.author, props.type);
    // }, []);

    const commentLookup = async (authorId, typeId) => {
        const userUrl = '/api/users/' + authorId;
        const contentTypeUrl = '/api/comments/types/' + typeId;
        try {
            let [author, type] = await Promise.all([
                fetch(userUrl),
                fetch(contentTypeUrl)
            ]);
            const authorData = await author.json();
            const typeData = await type.json();

            setAuthorName(authorData.name);
            setContentType(typeData.name);
            setIsLoading(false);

        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    const commentContent = (
        <div className={classes.commentGrid}>
            <div>{dayjs(props.date).format('M/D/YY')}</div>
            <div>{contentType}</div>
            <div>{props.content}</div>
            <div>{authorName}</div>
        </div>
    );

    return (
        <li>
            {isLoading && <p>Is loading...</p> || commentContent}
        </li>
    )
};

export default CommentItem;