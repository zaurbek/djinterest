export default (state = {items: []}, action) => {
  switch (action.type) {
    case 'NEW_DJIN':
      return {
        items: [...state.items,action.payload]
      };

    default:
      return state;
  }
};
