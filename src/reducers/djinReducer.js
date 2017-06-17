export default (state = {items: []}, action) => {
  switch (action.type) {
    case 'NEW_DJIN':
      return {
        items: [...state.items,action.payload]
      };
    case 'BOARD_ITEMS':
      return {
        items: action.payload,
      }
    case 'TRY_DELETE':
      return {
        items: state.items.filter(item=>{
          if (item.id==action.payload) {
            return false;
          }
          return true;
        })
      }
    case 'TRY_PIN_UPDATE':
      return {
        items: state.items.map(item=>{
          
          if (item.id === action.payload.id) {
            item.isLoading = true;
            if (item.pins.indexOf(action.payload.person)>-1) {
              console.log('name is in');
              item.pins.splice(item.pins.indexOf(action.payload.person), 1);
              
              return item;  
            } else {
              console.log('name is not in array')
              item.pins.push(action.payload.person);
              return item;
            }
          }
          return item;
        })
      }
    case 'UPDATE_DJIN_PIN':
      return {
        items: state.items.map(item=>{
          item.isLoading = false;
          if (item.id===action.payload.id) {
            item.pins = action.payload.pins;
            return item;
          }
          return item;
        })
      }
    default:
      return state;
  }
};
