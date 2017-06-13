export default (state = {}, action) => {
    switch (action.type) {
        case 'USER_DATA':
            return {
                user: action.payload,
                loggedIn: true
            }
        default:
            return state;
    }
};