import classes from './Order.module.css';

function Order(props) {

    const customer = props.customer;
    const lines = props.lines;

    return (
        <div>
            <div className={classes.orderHeader}>
                <h2>Wynnbrooke/David Bradley Cabinet Order</h2>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Project#</div>
                    <div className={classes.headerItem}>{customer.projectNum}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>PO#</div>
                    <div className={classes.headerItem}>{customer.poNum}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Dealer Name</div>
                    <div className={classes.headerItem}>{customer.dealerName}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Project Name</div>
                    <div className={classes.headerItem}>{customer.projectName}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Room Name</div>
                    <div className={classes.headerItem}>{customer.roomName}</div>
                </div>
                <p></p>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Door Style</div>
                    <div className={classes.headerItem}>{customer.doorStyle}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Drawer Front</div>
                    <div className={classes.headerItem}>{customer.drawerFront}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Hinge</div>
                    <div className={classes.headerItem}>{customer.hinge}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Guide</div>
                    <div className={classes.headerItem}>{customer.guide}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Material</div>
                    <div className={classes.headerItem}>{customer.material}</div>
                </div>
                <div className={classes.headerLine}>
                    <div className={classes.headerLabel}>Finish</div>
                    <div className={classes.headerItem}>{customer.finish}</div>
                </div>
            </div>
            <div className={classes.lineHeader}>
                <div>Line #</div>
                <div>Code</div>
                <div>Quantity</div>
                <div>Width</div>
                <div>x</div>
                <div>Height</div>
                <div>x</div>
                <div>Depth</div>
                <div>Hinging</div>
                <div>Ends</div>
                <div>Comment</div>
            </div>
            <ul>
                {lines.map((line) => (
                <div className={classes.line}>
                    <div>{line[0][0]}</div>
                    <div>{line[0][1]}</div>
                    <div>{line[0][7]}</div>
                    <div>{line[0][2]}</div>
                    <div>x</div>
                    <div>{line[0][3]}</div>
                    <div>x</div>
                    <div>{line[0][4]}</div>
                    <div>{line[0][5]}</div>
                    <div>{line[0][6]}</div>
                    <div className={classes.notes}>{line[0][8]}</div>
                </div>
                ))}
            </ul>
        </div>
    )
};

export default Order;