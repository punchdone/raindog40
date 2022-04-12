export default function orderStatus(status) {
    switch(status) {
        case 1: return 'Design';
        case 2: return 'Proposed';
        case 3: return 'Ordered';
        case 4: return 'Close';
        case 5: return 'Revised';
    }
};