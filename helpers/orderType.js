function orderType(orderTypeCode) {
    switch (orderTypeCode) {
        case 1: return 'Master';
        case 2: return 'ADD/JCO';
        case 3: return 'BLUE/Warranty';
    };
};

export default orderType;