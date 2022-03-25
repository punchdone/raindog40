import { useState, useEffect, Fragment } from 'react';
import classes from './BackorderList.module.css';
import BackorderItem from './BackorderItem';
import BackorderItemEdit from './BackorderItemEdit';
// import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';


function BackorderList(props) {
    // const [session, loading] = useSession();
    const [modalIsShown, setModalIsShown] = useState(false);
    const [target, setTarget] = useState();
    const [received, setReceived] = useState(false);
    const [shipped, setShipped] = useState(false);
    // const [backorders, setBackorders] = useState(props.backorders);
    const router = useRouter();

    // const role = session?.user.role;

    const showEditHandler = (e) => {
        // e.preventDefault();
        // console.log('Bingo!');
        // console.log(e);
        // setTarget(e);
        setTarget(e);
        setModalIsShown(true);
    }
    const hideEditHandler = () => {
        setModalIsShown(false);
    }

    const handleReceivedChange = (e) => {
        // console.log(e.target.value);
        setReceived(!received);
    };

    const handleShippedChange = () => {
        setShipped(!shipped);
    };

    const filterForm = (
        <div className={classes.filter}>
            <form className={classes.filterForm} onSubmit={props.onFilter}>
                <h3>Filter Out:</h3>
                <label htmlFor='received'>Received</label>
                <input id='received' type='checkbox' onChange={handleReceivedChange} value={received} />
                <label htmlFor='shipped'>Shipped</label>
                <input id='shipped' type="checkbox" onChange={handleShippedChange} value={shipped} />
                
                <button type='submit'>Filter</button>
            </form>
        </div>
    );

    return (
        <Fragment>
            <div>{filterForm}</div>
        {/* <div>{(role ===     "621ec1e2b9068d5a5df7e85a" || role === '621ec1f0b9068d5a5df7e85b') && filterForm}</div> */}
        {modalIsShown && <BackorderItemEdit onClose={hideEditHandler} backorderLine={target} />}
        <ul className={classes.list}>
            {props.backorders.map((backorder) => (
                <BackorderItem
                    key={backorder._id}
                    id={backorder._id}
                    date={dayjs(backorder.createdDate).format('M/D/YY')}
                    // date={backorder.Date instanceof Date && new Date(backorder.Date.toDateString()) || backorder.Date}
                    vendor={props.vendor}
                    po={backorder.po}
                    projectNum={backorder.projectNum}
                    channel={backorder.channel}
                    name={backorder.projectName}
                    item={backorder.item}
                    quantity={backorder.quantity}
                    shipped={backorder.shipped}
                    received={backorder.received}
                    notes={backorder.notes}
                    onEdit={showEditHandler}
                    status={backorder.backorderStatus}
                    comments={backorder.comments}
                />
            ))}
        </ul>
        </Fragment>
    )
};

export default BackorderList;