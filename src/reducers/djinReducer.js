export default (state = {}, action) => {
    switch (action.type) {
        case 'DJIN_DATA':
            return {
                items:action.payload
            }
        default:
            return state;
    }
};