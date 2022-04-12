import { Fragment } from 'react';

import classes from './OrderHeader.module.css';
import OrderLines from './OrderLines';

function OrderHeader(props) {
    const order = props.order;

    const sortedLines = order.lines.sort(function (a,b) {
        return a.lineNum - b.lineNum
    });

    return (
        <Fragment>
            <div className={classes.orderHeader}>
                <h2>Production Workorder</h2>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Project#</div>
                    <div className={classes.headerItem}>{props.projectNum}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>PO#</div>
                    <div className={classes.headerItem}>{order.poNum}</div>
                </div>
                <p></p>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Door Style</div>
                    <div className={classes.headerItem}>{order.doorStyle}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Drawer Front</div>
                    <div className={classes.headerItem}>{order.drawerFront}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Hinge</div>
                    <div className={classes.headerItem}>{order.hinge}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Guide</div>
                    <div className={classes.headerItem}>{order.guide}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Material</div>
                    <div className={classes.headerItem}>{order.material}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Finish</div>
                    <div className={classes.headerItem}>{order.finish}</div>
                </div>
            </div>
            <div className={classes.lineHeader}>
                <div>Line #</div>
                <div>Code</div>
                <div>Hinging</div>
                <div>Ends</div>
                <div>Quantity</div>
                <div>Width</div>
                <div>x</div>
                <div>Height</div>
                <div>x</div>
                <div>Depth</div>
                <div>Comment</div>
            </div>
            <ul className={classes.orderLines}>
                {sortedLines.map((line) => (
                    <li>
                        <OrderLines line={line} />
                    </li>
                ))}
            </ul>

        </Fragment>
    )
};

export default OrderHeader;