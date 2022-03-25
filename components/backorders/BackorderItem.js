import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/client';

import classes from "./BackorderItem.module.css";
import Card from "../ui/Card";
import CommentList from './comments/CommentList';
// import BackorderItemEdit from './BackorderItemEdit';

function BackorderItem(props) {
    // const [session, loading] = useSession();
    // const role = session?.user.role;
    const [isLoading, setIsLoading] = useState(true);
    const [channelName, setChannelName] = useState();
    // const [modalOn, setModalOn] = useState(false); 
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
      channelNameLookup(props.channel);
    }, []);

    async function channelNameLookup(channelId) {
        if (channelId !== '') {
          const channelUrl = 'https://live-raindog.pantheonsite.io/api/channel/' + channelId;
          const result = await fetch(channelUrl);
          const data = await result.json();
          setChannelName(data[0].code);
          setIsLoading(false);
      } else {
          setChannelName('Unknown');
          setIsLoading(false);
      }
    };

    const editHandler = (e) => {
      e.preventDefault();
      // console.log('Here is the edit path! Line #' + e.target.value);
      // setModalOn(true);
      props.onEdit(e.target.value);
    };

    function showCommentsHandler() {
      setShowComments((prevState) => !prevState);
    };

    // const deleteHandler = () => {
    //     alert('Delete the line!');
    // };

    const buttons = (
          <div className={classes.actions}>
            <button onClick={editHandler} value={props.id}>Edit</button>
            <button onClick={showCommentsHandler}>Comment</button>
          </div>
    );

    const backorderStep = props.status.order;

    const stepComplete = (step) => {
      if (step === backorderStep) {
        return classes.current;
      } else if (step < backorderStep) {
        return classes.complete;
      } else {
        return;
      }
    };

    // const progressChevron = !modalOn && (
    const progressChevron = (
      <div className={classes.progress}>
            <div>
              {/* <p>Place chevron here! Status: {props.status}</p> */}
            </div>
            <div className={classes.chevron}>
              <ul className={classes.stepmenu}>
                <li className={stepComplete(1)}>Identified</li>
                <li className={stepComplete(2)}>Ordered</li>
                <li className={stepComplete(3)}>Received</li>
                <li className={stepComplete(4)}>Scheduled</li>
                <li className={stepComplete(5)}>Shipped</li>
                <li className={stepComplete(6)}>Complete</li>
              </ul>
            </div>
      </div>
    );

    const backorderListItem = (
      <div>
        <Card>
          {progressChevron}
          <div className={classes.content}>
            {/* <h3>{props.projectNum} {props.channel != 'undefined' && `${props.name}` || `${props.channel} - ${props.name}`}</h3> */}
            <h3>{props.projectNum} {channelName}-{props.name}</h3>
            <div>{props.date}</div>
            <div>{props.vendor}</div>
            <div>PO#: {props.po}</div>
            <div>{props.item}</div>
            <div>Qty: {props.quantity}</div>
            <div>Received: {props.received}</div>
            <div>Shipped: {props.shipped}</div>
            {buttons}
            {/* {role === '621ec1e2b9068d5a5df7e85a' && buttons || '  '}
            {role === '621ec1f0b9068d5a5df7e85b' && buttons || '  '} */}
            <div>Notes: {props.notes}</div>
          </div>
          {showComments && <CommentList backorderId={props.id} comments={props.comments} />}
        </Card>
      </div>
    );

  return (
    <li className={classes.item}>
      {isLoading && <p>Is loading...</p> || backorderListItem}
    </li>
  );
}

export default BackorderItem;
